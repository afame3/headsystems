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
if(!class_exists('modcommunitygroupssuggestionsHelper'))
{
    class modcommunitygroupssuggestionsHelper
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
         * Will return the group id in array
         * @param $params
         * @return array|mixed
         */
        public function getGroupsSuggestions($params)
        {
            $suggestionType = $params->get('suggest_method', 0); // 0 = random, 1 = friends' group
            $limit = $params->get('limit', 12);

            $db = JFactory::getDbo();
            $my = CFactory::getUser();

            if(!$my->id){
                return;
            }

            $results = array();
            if($suggestionType == 0){
                //get random group
                $query = "SELECT id FROM ".$db->quoteName('#__community_groups')." WHERE "
                    .$db->quoteName('published')."=".$db->quote(1)
                    ." AND ".$db->quoteName('unlisted')."=".$db->quote(0)
                    ." AND ".$db->quoteName('id')." NOT IN (SELECT groupid FROM ".$db->quoteName('#__community_groups_members')." WHERE memberid=".$db->quote($my->id).")";

                $db->setQuery($query);
                $results = $db->loadColumn(); // group ids
            }else{
                //get friends group
                $model = CFactory::getModel('Friends');
                $friends = $model->getFriends($my->id, 'latest', false, 'all', 0, '', true); // get all my friends

                $friendsGroup = array();

                if(!empty($friends)){
                    $query = "SELECT DISTINCT groupid FROM ".$db->quoteName('#__community_groups_members')
                        ." WHERE groupid NOT IN (SELECT groupid FROM ".$db->quoteName('#__community_groups_members')." WHERE memberid=".$db->quote($my->id).")"
                        ." AND memberid IN(".implode(',',$friends).")";

                    $db->setQuery($query);

                    $results = $db->loadColumn();
                }
            }

            shuffle($results);

            return array_slice($results, 0, $limit);
		}
	}
}
