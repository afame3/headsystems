<?php
    /**
     * @copyright (C) 2015 iJoomla, Inc. - All rights reserved.
     * @license GNU General Public License, version 2 (http://www.gnu.org/licenses/gpl-2.0.html)
     * @author iJoomla.com <webmaster@ijoomla.com>
     * @url https://www.jomsocial.com/license-agreement
     * The PHP code portions are distributed under the GPL license. If not otherwise stated, all images, manuals, cascading style sheets, and included JavaScript *are NOT GPL, and are released under the IJOOMLA Proprietary Use License v1.0
     * More info at https://www.jomsocial.com/license-agreement
     */
    defined('_JEXEC') or die('Unauthorized Access');

    // Check if JomSocial core file exists
    $corefile = JPATH_ROOT . '/components/com_community/libraries/core.php';

    jimport('joomla.filesystem.file');
    if (!JFile::exists($corefile)) {
        return;
    }

    // Include JomSocial's Core file, helpers, settings...
    require_once($corefile);
    require_once dirname(__FILE__) . '/helper.php';

    // Add proper stylesheet
    JFactory::getLanguage()->isRTL() ? CTemplate::addStylesheet('style.rtl') : CTemplate::addStylesheet('style');

    $document = JFactory::getDocument();
    $document->addStyleSheet(JURI::root(true) . '/modules/mod_community_trending_hashtags/style.css');

    /*
    * If we need any other additional configuration we can add it here like this
    $document = JFactory::getDocument();
    $document->addStyleSheet(JURI::root(true) . '/example/example.css');
    $config = CFactory::getConfig();
    Alex's reference for doing ajax calls through module or plugin.
    https://github.com/Joomla-Ajax-Interface/component
    */

    $user = CFactory::getUser();

    $hashtags = modcommunitytrendinghashtagsHelper::getHashTags($params->get('limit'), $params->get('days'));


    require(JModuleHelper::getLayoutPath('mod_community_trending_hashtags', $params->get('layout', 'default')));
