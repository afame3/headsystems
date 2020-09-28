<?php
/**
* @copyright (C) 2015 iJoomla, Inc. - All rights reserved.
* @license GNU General Public License, version 2 (http://www.gnu.org/licenses/gpl-2.0.html)
* @author iJoomla.com <webmaster@ijoomla.com>
* @url https://www.jomsocial.com/license-agreement
* The PHP code portions are distributed under the GPL license. If not otherwise stated, all images, manuals, cascading style sheets, and included JavaScript *are NOT GPL, and are released under the IJOOMLA Proprietary Use License v1.0
* More info at https://www.jomsocial.com/license-agreement
*/
defined('_JEXEC') or die('Restricted access');

require_once( JPATH_ROOT .'/components/com_community/libraries/core.php');

// All the module logic should be placed here
if(!class_exists('modcommunitybirthdaysHelper')) {
    class modcommunitybirthdaysHelper
    {
        public static function prepareUpdate(&$update, &$table)
        {   
            $lang = JFactory::getLanguage();
            $extension = 'com_community';
            $base_dir = JPATH_ADMINISTRATOR;
            $language_tag = '';
            $lang->load($extension, $base_dir, $language_tag, true);

            JFactory::getApplication()->enqueueMessage(JText::sprintf('COM_COMMUNITY_PACKAGE_DOWNLOAD_UPDATE', 'https://member.joomlart.com/'), "JomSocial Module Update");
        
            JFactory::getApplication()->redirect(CRoute::_("index.php?option=com_installer&view=update", false));
        }

        /**
         * @param int $limit
         * @param int $dayAdvance
         * @return array
         */
        public static function getFriendBirthdays( $settings ) {

            // 0 = all users, 1 = friends only (default)
            $display = $settings->get('show', 1);
            $days = $settings->get('days', 3);
            $limit = $settings->get('limit', 3);
            $fieldId = $settings->get('jsbirthday',0); //birthday field id

            $db = JFactory::getDbo();

            if(!$fieldId){
                $query = "SELECT id FROM ".$db->quoteName('#__community_fields')
                    ." WHERE ".$db->quoteName('type')."=".$db->quote('birthdate')." AND "
                    .$db->quoteName('fieldcode')."=".$db->quote('FIELD_BIRTHDATE');
                $db->setQuery($query);
                $fieldId = $db->loadResult();
            }

            if(!$fieldId){
                return array();
            }
            
            if(!$display){
                //this will get all the information
                $query = "SELECT a.user_id, DATE_FORMAT(a.value,'%d-%m') as php_date, DATE_FORMAT(a.value,'%W, %M %e') as formatted_date, TIMESTAMPDIFF(YEAR,a.value,CURDATE()) AS age, DATE_FORMAT(a.value,'%m%d') as value, b.block " .
                    "FROM " . $db->quoteName('#__community_fields_values')." AS a" .
                    " LEFT JOIN " . $db->quoteName('#__users') . ' AS b ON b.id = a.user_id' .
                    " WHERE " . $db->quoteName('a.field_id') . "=" . $db->quote($fieldId) .
                    " AND " . $db->quoteName('b.block') . "!=" . $db->quote(1);
            }else{
                //this should be friends only
                $my = CFactory::getUser();
                if($my->id){
                    //should only be shown to logged in user
                    $friendsModel =  CFactory::getModel( 'friends' );
                    $friends =  $friendsModel->getFriends($my->id,'', false, 'all', 0, '', true);
                }else{
                    return array();
                }

                if(count($friends) > 0){
                    $queryIn = "'".implode("','",$friends)."'";
                    $query = "SELECT a.user_id, DATE_FORMAT(value,'%d-%m') as php_date,DATE_FORMAT(a.value,'%W, %M %e') as formatted_date, TIMESTAMPDIFF(YEAR,a.value,CURDATE()) AS age, DATE_FORMAT(a.value,'%m%d') as value " .
                        "FROM ".$db->quoteName('#__community_fields_values')." AS a" .
                        " LEFT JOIN " . $db->quoteName('#__users') . ' AS b ON b.id = a.user_id' .
                        " WHERE " . $db->quoteName('a.field_id')."=".$db->quote($fieldId) .
                        " AND " . $db->quoteName('a.user_id')." IN (".$queryIn.")" . 
                        " AND " . $db->quoteName('b.block') . "!=" . $db->quote(1);
                }else{
                    return array();
                }
            }
            $currentDate = getdate();

            //merge query with the days filter
            if($days){
                $query .= " AND (DATE_ADD(a.value, INTERVAL YEAR(CURDATE())-YEAR(a.value) + IF(DAYOFYEAR(CURDATE()) > DAYOFYEAR(a.value),1,0) YEAR) BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL ".$days." DAY)";
                $query .= " OR (MONTH(a.value)=".$db->quote($currentDate['mon'])
                  ." AND DAYOFMONTH(a.value)=".$db->quote($currentDate['mday'])."))";
            }else{
                $query .= " AND (MONTH(a.value)=".$db->quote($currentDate['mon'])
                  ." AND DAYOFMONTH(a.value)=".$db->quote($currentDate['mday']).")";
            }

            // get block list of users
            $my = CFactory::getUser();
            $blockLists = $my->getBlockedUsers();
            $blockedUserIds = array();

            foreach ($blockLists as $blocklist) {
                $blockedUserIds[] = $blocklist->blocked_userid;
            }

            $blockedUserIds = implode(',', $blockedUserIds);

            if ($blockedUserIds) {
                $query .= " AND ".$db->quoteName('a.user_id')." NOT IN (".$blockedUserIds.")";
            }
            
            $db->setQuery($query);

            //value = date to sort, formatted_date, user id
            $results = $db->loadObjectList();

            //get today's date to sort
            $today = date('md');

            $thisYear = array();
            $nextYear = array();
            //we will compare against the value
            foreach($results as $result){
                $result->formatted_date = date('l, F d',strtotime($result->php_date.date('-Y')));

                if($today > $result->value){
                    //add one year to the value
                    $yearNext = date('Y')+1;
                    $result->formatted_date = date('l, F d',strtotime($result->php_date.'-'.$yearNext));
                    $nextYear[$result->value][] = $result;
                }else{
                    $thisYear[$result->value][] = $result;
                }
            }

            ksort($thisYear);
            ksort($nextYear);

            $birthdays = array_merge($thisYear, $nextYear);

            if($limit){
                $tempBirthday = array();
                $current = 0;
                foreach($birthdays as $key=>$birthday){

                    foreach($birthday as $day){
                       if($current == $limit){
                           break;
                       }
                        $tempBirthday[$key][] = $day;
                        $current++;
                    }

                    if($current == $limit){
                           break;
                       }
                }
                $birthdays = $tempBirthday;
            }

            return $birthdays;

        }

	}
}
