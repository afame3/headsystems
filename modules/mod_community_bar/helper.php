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

if (!class_exists('modcommunitybarHelper')) {
    class modcommunitybarHelper
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
         * Get a list of the menu items.
         * @param   \Joomla\Registry\Registry  &$params  The module options.
         * @return  array
         */
        public static function getList(&$params, $type = 'navigationmenu')
        {   
            $app = JFactory::getApplication();
            $menu = $app->getMenu();
            $items = $menu->getItems(null, null);

            // get selected menu items
            foreach ($items as $key => $menuItem) {
                if ($params->get($type) && !in_array($menuItem->id, $params->get($type))) {
                    unset($items[$key]);
                }
            }

            return $items;
        }
	}
}
