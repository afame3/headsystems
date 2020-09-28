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

    $moduleParams = $params; //assign params to new module params
    $defaultLogo = $params->get('toolbar_logo','');
    $iconLogo = $params->get('toolbar_logosm','');
    $logoUrl = $params->get('logo_url','');
    $config = CFactory::getConfig();
    // Include JomSocial's Core file, helpers, settings...
    require_once($corefile);
    require_once dirname(__FILE__) . '/helper.php';

    // Add proper stylesheet
    JFactory::getLanguage()->isRTL() ? CTemplate::addStylesheet('style.rtl') : CTemplate::addStylesheet('style');

    if ($moduleParams->get('login', 0)) {
        $app = JFactory::getApplication();
        $item = $app->getMenu()->getItem($moduleParams->get('login'));

        if ($item) {
            $url = 'index.php?Itemid=' . $item->id;
        } else {
            // Stay on the same page
            $url = JUri::getInstance()->toString();
        }

        $loginLink = base64_encode(rtrim(JUri::root(), '/').CRoute::_($url, false));
    } else {
        $loginLink = base64_encode(rtrim(JUri::root(), '/').CRoute::_('index.php?option=com_community&view=' . $config->get('redirect_login'), false));
    }

    if ($moduleParams->get('logout', 0)) {
        $app = JFactory::getApplication();
        $item = $app->getMenu()->getItem($moduleParams->get('logout'));

        if ($item) {
            $url = 'index.php?Itemid=' . $item->id;
        } else {
            // Stay on the same page
            $url = JUri::getInstance()->toString();
        }

        $logoutLink = base64_encode(rtrim(JUri::root(), '/').CRoute::_($url, false));
    } else {
        $logoutLink = base64_encode(rtrim(JUri::root(), '/').CRoute::_('index.php?option=com_community&view=' . $config->get('redirect_logout'), false));
    }

    $navMenuItems = modcommunitybarHelper::getList($moduleParams, 'navigationmenu');
    $configMenuItems = modcommunitybarHelper::getList($moduleParams, 'configurationmenu');
    $isMessageEnable = $config->get('enablepm');
    require(JModuleHelper::getLayoutPath('mod_community_bar', $params->get('layout', 'default')));
