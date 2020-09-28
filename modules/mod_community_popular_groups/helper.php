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
if(!class_exists('modcommunitypopulargroupsHelper'))
{
    class modcommunitypopulargroupsHelper
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
               $filterCategoryQuery = " AND ".$db->quoteName('categoryid')."=".$db->quote($category)." ";
            }

            //get all groups
            $model = CFactory::getModel('groups');

            // Get group in category and it's children.
            $groups = $model->getAllGroups(($category) ? $category : array(), null, null, null, false, true, false, true);

            $groupIds = array();
            foreach($groups as $group){
                $groupIds[] = $group->id;
            }

            $groupIds = implode($db->quote($groupIds),',');

            if(!$groupIds){
                return array();
            }

            switch($type){
                case 'view' :
                    $query = "SELECT id as gid, hits as count, 'view' as type FROM ".$db->quoteName('#__community_groups')
                        ." WHERE id IN(".$groupIds.")"
                        ." ORDER BY hits DESC ";
                    break;
                case 'like' :
                    $query = "SELECT g.id as gid, LENGTH(a.`like`) - LENGTH(REPLACE(a.`like`,',','')) AS count FROM "
                                .$db->quoteName('#__community_groups')." as g LEFT JOIN ".$db->quoteName('#__community_likes')." as a ON g.id=a.uid"
                                ." WHERE g.id IN(".$groupIds.") or (a.".$db->quoteName('element')."=".$db->quote('groups')." AND a.uid IN(".$groupIds."))"
                                ." GROUP BY gid ORDER BY count DESC";
                    break;
                case 'post' :
                    $query = "SELECT g.id as gid, count(a.id) as count FROM "
                                .$db->quoteName('#__community_groups')." as g LEFT JOIN ".$db->quoteName('#__community_activities')." as a ON g.id=a.groupid"
                                ." WHERE g.id IN(".$groupIds.") or (".$db->quoteName('app')."=".$db->quote('groups.wall')." AND a.groupid IN(".$groupIds."))"
                                ." GROUP BY ".$db->quoteName('groupid')." ORDER BY count DESC";
                    break;
                default:
                    //members
                    $query = "SELECT a.groupid as gid, 'members' as type , COUNT(*) as count FROM " . $db->quoteName('#__community_groups_members') . ' AS a '
                        . 'JOIN ' . $db->quoteName('#__users') . ' AS b ON a.' . $db->quoteName('memberid') . '=b.' . $db->quoteName('id')
                        . 'JOIN ' . $db->quoteName('#__community_groups') . ' AS c ON c.' . $db->quoteName('id') . '=a.' . $db->quoteName('groupid')
                        . 'AND b.' . $db->quoteName('block') . '=0 '
                        . 'WHERE ' . $db->quoteName('approved') . '=' . $db->Quote('1') . ' '
                        ." AND c.id IN(".$groupIds.")"
                        . 'AND permissions!=' . $db->Quote(COMMUNITY_GROUP_BANNED)
                        .' GROUP BY groupid ORDER BY count DESC';
            }

            if($limit){
                $query .= " LIMIT 0, ".$limit;
            }

            $db->setQuery($query);

            return $db->loadObjectList();
        }

        public function getGroupsData( &$params ){
            $limit	= $params->get('limit', 5);

            $daysAgo = $params->get('custom_days', 0);
            $category = $params->get('group_category', 0);


            $type = 'like';
            if($params->get('sort_by') == 1){
                $type = 'view';
            }elseif($params->get('sort_by') == 2){
                $type = 'post';
            }elseif($params->get('sort_by') == 3){
                $type = 'members';
            }

            $results = $this->formatData($type, $daysAgo, $limit, $category);

            $groups = array();
            $like = new CLike();
            foreach($results as $key=>$arr) {

                $group = JTable::getInstance('Group', 'CTable');
                $group->load($arr->gid);

                //skip if this is a hidden group and viewer is not the member of the group
                if($group->unlisted && !$group->isMember(CFactory::getUser()->id)){
                    continue;
                }

                $group->posts	= CGroupHelper::getPostCount($group->id);
                $group->views   = (isset($formattedResults[$key]['view'])) ? $formattedResults[$key]['view'] : 0;
                $group->likes   = $like->getLikeCount('groups', $group->id);;
                $groups[] = $group;
            }

            return $groups;
        }
    }
}
