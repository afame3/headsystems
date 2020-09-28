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
if(!class_exists('modcommunitypopulareventsHelper'))
{
    class modcommunitypopulareventsHelper
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
        private function formatData($type = 'all', $days = 0, $limit = 5, $category = 0){
            $db = JFactory::getDbo();

            $filterCategoryQuery = '';
            if($category){
               $filterCategoryQuery = " AND c.".$db->quoteName('catid')."=".$db->quote($category)." ";
            }else{
                $category = null;
            }

            //we must first get all the upcoming events that consist if the category, if any applied
            $model = CFactory::getModel('Events');
            $model->setState('limit', $limit);
            $model->setState('limitstart', 0);
            $events = $model->getEvents(
                $category
            );

            $eventIds = array();
            foreach($events as $event){
                $eventIds[] = $event->id;
            }

            $eventIds = implode($db->quote($eventIds),',');

            if(!$eventIds){
                return array();
            }


            switch($type){
                case 'view' :
                    $query = "SELECT id as eid, hits as count FROM ".$db->quoteName('#__community_events')
                        ." WHERE id IN(".$eventIds.")"
                        ." ORDER BY hits DESC ";
                    break;
                case 'like' :
                    $query = "SELECT e.id as eid, count(a.id) as count FROM "
                                .$db->quoteName('#__community_events')." as e LEFT JOIN ".$db->quoteName('#__community_likes')." as a ON e.id=a.uid"
                                ." WHERE e.id IN(".$eventIds.") or (a.".$db->quoteName('element')."=".$db->quote('events.wall')." AND a.uid IN(".$eventIds."))"
                                ." GROUP BY eid ORDER BY count DESC";
                    break;
                case 'post' :
                    $query = "SELECT e.id as eid, count(a.id) as count FROM "
                                .$db->quoteName('#__community_events')." as e LEFT JOIN ".$db->quoteName('#__community_activities')." as a ON e.id=a.eventid"
                                ." WHERE e.id IN(".$eventIds.") or (".$db->quoteName('app')."=".$db->quote('events.wall')." AND a.eventid IN(".$eventIds."))"
                                ." GROUP BY `eventid` ORDER BY count DESC";
                    break;

                default:
                    //members
                    $query = "SELECT a.eventid as eid, ".$db->quote('members')." as type , COUNT(*) as count FROM " . $db->quoteName('#__community_events_members') . " AS a "
                        . 'JOIN ' . $db->quoteName('#__users') . ' AS b ON a.' . $db->quoteName('memberid') . '=b.' . $db->quoteName('id')
                        . 'JOIN ' . $db->quoteName('#__community_events') . ' AS c ON c.' . $db->quoteName('id') . '=a.' . $db->quoteName('eventid')
                        . 'AND b.' . $db->quoteName('block') . '=0 '
                        . "AND c.id IN(".$eventIds.")"
                        . 'WHERE ' . $db->quoteName('status') . '=' . $db->Quote('1') . ' '
                        .' GROUP BY eventid ORDER BY count DESC';
            }

            if($limit){
                $query .= " LIMIT 0, ".$limit;
            }

            $db->setQuery($query);

            return $db->loadObjectList();
        }

        public function getEventsData( &$params ){
            $limit	= $params->get('limit', 5);

            $daysAgo = $params->get('custom_days', 0);
            $category = $params->get('event_category', 0);
            $events = array();


            $type = 'like';
            if($params->get('sort_by') == 1){
                $type = 'view';
            }elseif($params->get('sort_by') == 2){
                $type = 'post';
            }elseif($params->get('sort_by') == 3){
                $type = 'members';
            }

            $topEventsArr = $this->formatData($type, $daysAgo, $limit, $category);

            $like = new CLike();

            foreach($topEventsArr as $key=>$arr) {

                $event = JTable::getInstance('Event', 'CTable');
                $event->load($arr->eid);

                //skip if this is a hidden event and viewer is not the member of the event
                if($event->unlisted && !$event->isMember(CFactory::getUser()->id)){
                    continue;
                }

                $event->posts	= CEventHelper::getPostCount($event->id);
                $event->views   = (isset($formattedResults[$key]['view'])) ? $formattedResults[$key]['view'] : 0;
                $event->likes   = $like->getLikeCount('events', $event->id);
                $events[] = $event;
            }

            return $events;
        }
    }
}
