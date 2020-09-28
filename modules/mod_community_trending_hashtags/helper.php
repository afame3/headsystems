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
if(!class_exists('modcommunitytrendinghashtagsHelper'))
{
    class modcommunitytrendinghashtagsHelper
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
         * @param int $days
         * @return array
         */
        public static function getHashTags($limit = 30, $days = 700)
        {
            //to find all the activities with hashtag for the past x days
			$db = JFactory::getDbo();
            $query = "SELECT id,title FROM ".$db->quoteName('#__community_activities')
                . " WHERE updated_at >= NOW() - INTERVAL ".$days." DAY AND ".$db->quoteName('title')
                ." LIKE ".$db->quote("%#%")." ORDER BY id DESC";
            $db->setQuery($query);
            $results = $db->loadObjectList();

            $hashtags = array();

            //find all the hashtags that exists within the activity
            foreach($results as $result){
                $matches = array();
                preg_match_all('/(^|[^a-z0-9_])#([^\s[:punct:]]+)/', $result->title, $matches);
                foreach($matches[0] as $match){
                    $tag = explode('#', trim($match));

                    if (isset($tag[1])) {
                        $match = '#'.$tag[1];
                        $hashtags[] = $db->quote(trim($match));
                    }
                }
            }

            $hashtags = implode(',',array_unique($hashtags));

            if(empty($hashtags)){
                return array();
            }

            $query = "SELECT * FROM ".$db->quoteName('#__community_hashtag'). " WHERE tag IN (".$hashtags.")";
            $db->setQuery($query);
            $results = $db->loadObjectList();

            $formattedResults = array();
            foreach($results as $result){
                $params = new CParameter($result->params);
                $formattedResults[ltrim ($result->tag, '#')] = count($params->get('activity_id'));
            }

            arsort($formattedResults);

            $formattedResults = array_slice($formattedResults, 0, $limit);

            //return the tag as well as the
            return $formattedResults;
		}

	}
}
