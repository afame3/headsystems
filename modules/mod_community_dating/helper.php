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
if(!class_exists('modcommunitydatingHelper'))
{
    class modcommunitydatingHelper
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

        public function getSearchForm(){

        }

        public static function createDatingModuleCookie($data = array(), $fieldCode = '', $cookieVar = 'CommunityModuleGender')
        {   
            $app = JFactory::getApplication();
            $jinput = $app->input;
            $jcookie  = $jinput->cookie;
             
            foreach ($data as $key => $value) {
                if ($value == $fieldCode) {
                    $index = filter_var($key, FILTER_SANITIZE_NUMBER_INT);
                    
                    if (isset($data['value'.$index]) && $data['value'.$index]) {
                        $jcookie->set($cookieVar, $data['value'.$index], 0);
                    }

                    // set Age To cookie
                    if (isset($data['value'.$index.'_2']) && $data['value'.$index.'_2']) {
                        $jcookie->set($cookieVar.'To', $data['value'.$index.'_2'], 0);
                    }
                }    
            }

            return true;
        }
    }
}
