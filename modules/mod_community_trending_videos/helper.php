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
if(!class_exists('modcommunitytrendingvideosHelper'))
{
    class modcommunitytrendingvideosHelper
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

            $query = "SELECT s.*, SUM(s.count) AS summary FROM ".$db->quoteName('#__community_video_stats')." AS s JOIN "
                .$db->quoteName('#__community_videos')." AS v ON s.vid=v.id"
                ." WHERE v.published=1 ". $extraSql
                ." GROUP BY s.vid ORDER BY summary DESC LIMIT " . $limit;

            $db->setQuery($query);

            return $db->loadObjectList();
        }

        public function getVideosData( &$params ){
            $db 	= JFactory::getDBO();

            $limit	= $params->get('limit', 10);
            $daysAgo = $params->get('custom_days', 0);


            $type = 'like';
            if($params->get('sort_by') == 1){
                $type = 'view';
            }elseif($params->get('sort_by') == 2){
                $type = 'comment';
            }

            $results = $this->formatData($type, $daysAgo, $limit);

            $formattedResults = array(); //[id][type] = count

            foreach($results as $result){
                if(isset($formattedResults[$result->vid][$result->type])){
                    $formattedResults[$result->vid][$result->type] += $result->summary;
                }else{
                    $formattedResults[$result->vid][$result->type] = $result->summary;
                }
            }

            //after we format the results, lets sort the by the type
            $topVideosArr = array();

            foreach($formattedResults as $key=>$result){
                if(isset($result[$type])){
                    $topVideosArr[$key] = $result[$type];
                }else{
                    $topVideosArr[$key] = 0;
                }
            }
            arsort($topVideosArr);

            $videos = array();
            //after sorted, rearrange the array
            $i = 0;
            $like = new CLike();
            $wallModel = CFactory::getModel('wall');
            
            foreach($topVideosArr as $key=>$arr) {
                $video = JTable::getInstance('Video', 'CTable');
                $video->load($key);

                //we only take user video for now
                if($video->creator_type != 'user' || ($video->creator_type == 'user' && !CFactory::getUser()->authorise('community.view','videos.user.video.'.$video->id) )){
                    continue;
                }

                $likeCount = $like->getLikeCount('videos', $video->id);
                $commentCount = $wallModel->getCount($video->id,'videos');

                $video->comments	= (isset($formattedResults[$key]['comment'])) ? $formattedResults[$key]['comment'] : $commentCount;
                $video->views         = (isset($formattedResults[$key]['view'])) ? $formattedResults[$key]['view'] : 0;
                $video->likes         = (isset($formattedResults[$key]['like'])) ? $formattedResults[$key]['like'] : $likeCount;
                $videos[] = $video;
            }

            return array_slice($videos, 0, $limit);
        }
    }
}
