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
if(!class_exists('modcommunitytrendingeventsHelper'))
{
    class modcommunitytrendingeventsHelper
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
         * @param int $days
         * @param $type
         */
        private function formatData($type = 'all', $days = 0, $limit = 10){
            $db = JFactory::getDbo();

            $extraSql = '';
            if($days){
                $dateToday = date("Y-m-d");
                $daysAgo = date('Y-m-d', strtotime('-'.$days.' days', strtotime($dateToday)));
                $extraSql = ' AND date > '.$db->quote($daysAgo);
            }

            if($type != 'all'){
                $extraSql .= ' AND s.'.$db->quoteName('type')."=".$db->quote($type);
            }

            $query = "SELECT * FROM ".$db->quoteName('#__community_event_stats')." AS s JOIN "
                .$db->quoteName('#__community_events')." AS e ON s.eid=e.id"
                ." WHERE 1 ". $extraSql;

            $db->setQuery($query);

            return $db->loadObjectList();
        }

        public function getEventsData( &$params ){
            $db 	= JFactory::getDBO();

            $limit	= $params->get('limit', 10);
            $daysAgo = $params->get('custom_days', 0);


            $type = 'like';
            if($params->get('sort_by') == 1){
                $type = 'view';
            }elseif($params->get('sort_by') == 2){
                $type = 'post';
            }

            $results = $this->formatData($type, $daysAgo, $limit);

            $formattedResults = array(); //[id][type] = count
            foreach($results as $result){
                if(isset($formattedResults[$result->eid][$result->type])){
                    $formattedResults[$result->eid][$result->type] += $result->count;
                }else{
                    $formattedResults[$result->eid][$result->type] = $result->count;
                }
            }

            //after we format the results, lets sort the by the type
            $topEventsArr = array();

            foreach($formattedResults as $key=>$result){
                if(isset($result[$type])){
                    $topEventsArr[$key] = $result[$type];
                }else{
                    $topEventsArr[$key] = 0;
                }
            }
            arsort($topEventsArr);

            $events = array();
            //after sorted, rearrange the array
            $i = 0;
            foreach($topEventsArr as $key=>$arr) {
                $event = JTable::getInstance('Event', 'CTable');
                $event->load($key);

                //skip if this is a hidden event and viewer is not the member of the event
                if($event->unlisted && !$event->isMember(CFactory::getUser()->id)){
                    continue;
                }

                //also skip if this is a private group event and current user is not the member of the private group
                if($event->type == 'group'){
                    $group = CFactory::getModel('groups');
                    if(!$group->isMember(CFactory::getUser()->id, $event->contentid)){
                        continue;
                    }
                }

                $event->comments	= (isset($formattedResults[$key]['comment'])) ? $formattedResults[$key]['comment'] : 0;
                $event->views         = (isset($formattedResults[$key]['view'])) ? $formattedResults[$key]['view'] : 0;
                $event->likes         = (isset($formattedResults[$key]['like'])) ? $formattedResults[$key]['like'] : 0;
                $events[] = $event;
            }

            return array_slice($events, 0, $limit);
        }
    }
}
