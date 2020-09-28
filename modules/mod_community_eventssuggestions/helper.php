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
if(!class_exists('modcommunityeventssuggestionsHelper'))
{
    class modcommunityeventssuggestionsHelper
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

        public function getEventsSuggestions($params)
        {
            $suggestionType = $params->get('suggest_method', 0); // 0 = random, 1 = friends' event
            $includeGroupEvents = $params->get('include_group_events', 1); // only search normal event if group events is disabled
            $limit = $params->get('limit', 12);

            $my = CFactory::getUser();
            $db = JFactory::getDbo();

            if(!$my->id){
                return;
            }


            $CTimeHelper = new CTimeHelper();
            $pastDate = $CTimeHelper->getLocaleDate();

            //load all events that is not ended yet and make sure to check if group events are included
            $query = "SELECT id, parent FROM ".$db->quoteName('#__community_events'). " WHERE "
                .$db->quoteName('startdate') . ' >= ' . $db->Quote($pastDate->format('Y-m-d H:i:s', true, false))
                ." AND ".$db->quoteName('unlisted')."=".$db->quote(0);

            if(!$includeGroupEvents){
                // exlude group events if its false
                $query .= " AND ".$db->quoteName('type')."<>".$db->quote('group');
            }else{
                //if group event is allowed, make sure the group is not private
                $query .= " AND contentid NOT IN ( SELECT id FROM ".$db->quoteName('#__community_groups')." WHERE ".$db->quoteName('approvals')."=1 )";
            }

            $query .= ' AND ((' . $db->quoteName('parent') . '=' . $db->quote(0) . ' && (' . $db->quoteName('repeat') . '=' . $db->quote('') . ' || ' . $db->quoteName('repeat') . ' IS NULL)) || (' . $db->quoteName('parent') . '!= 0 && ' . $db->quoteName('repeat') . ' IS NOT NULL))';

            //$query .= " ORDER BY id DESC"; // sort by desc to make the sorting easier (to only show latest recurring event if there is any)

            $db->setQuery($query);
            $results = $db->loadObjectList();

            $tempResult = array();

            // filter recurring event to show only the latest one
            $existingId = array();
            foreach($results as $key=>$result){
                if($result->parent == 0){
                    $existingId[] = $result->id;
                    $tempResult[] = $result->id;
                }elseif(!in_array($result->parent,$existingId)){
                    $existingId[] = $result->parent;
                    $tempResult[] = $result->id;
                }
            }

            $results = $tempResult;

            if($suggestionType == 1){
                //get all friends and their events
                $model = CFactory::getModel('Friends');
                $friends = $model->getFriends($my->id, 'latest', false, 'all', 0, '', true); // get all my friends

                if(!empty($friends)){
                    $query = "SELECT DISTINCT eventid FROM ".$db->quoteName('#__community_events_members')
                        ." WHERE eventid NOT IN (SELECT eventid FROM ".$db->quoteName('#__community_events_members')." WHERE memberid=".$db->quote($my->id).")"
                        ." AND memberid IN(".implode(',',$friends).")";

                    $db->setQuery($query);

                    $results = array_intersect($db->loadColumn(), $results); // intesect the results with the result from friends
                }
            }

            //events that the current user is in
            $query = "SELECT eventid FROM ".$db->quoteName('#__community_events_members')." WHERE ".$db->quoteName('memberid').'='.$db->quote($my->id)
                    ." GROUP BY ".$db->quoteName('eventid');
            $db->setQuery($query);
            $userEvents = $db->loadColumn();

            //remove the eventid from the results if user already a part of the event
            foreach($results as $key=>$id){
                if(in_array($id, $userEvents)){
                    unset($results[$key]);
                    continue;
                }
            }

            shuffle($results);

            return array_slice($results, 0, $limit);
		}
	}
}
