<?php
/**
* @copyright (C) 2015 iJoomla, Inc. - All rights reserved.
* @license GNU General Public License, version 2 (http://www.gnu.org/licenses/gpl-2.0.html)
* @author iJoomla.com <webmaster@ijoomla.com>
* @url https://www.jomsocial.com/license-agreement
* The PHP code portions are distributed under the GPL license. If not otherwise stated, all images, manuals, cascading style sheets, and included JavaScript *are NOT GPL, and are released under the IJOOMLA Proprietary Use License v1.0
* More info at https://www.jomsocial.com/license-agreement
*/
defined( '_JEXEC' ) or die( 'Unauthorized Access' );

$svgPath = CFactory::getPath('template://assets/icon/joms-icon.svg');
include_once $svgPath;

$user = CFactory::getUser();
$params = $user->getParams();
$config = CFactory::getConfig();
$url = CRoute::_('index.php?option=com_community');
$usersConfig = JComponentHelper::getParams('com_users');

$toolbar = CToolbarLibrary::getInstance();
$newChatCount = $toolbar->getTotalNotifications('chat');
$newFriendInviteCount = $toolbar->getTotalNotifications('friends');
$newEventInviteCount = $toolbar->getTotalNotifications('events');

$newNotificationCount = CFactory::getModel('notification')->getNotificationCount( $user->id, '0',
        $params->get('lastnotificationlist','') );
$newEventInviteCount += $newNotificationCount;

?>

<?php if($user->id){?>

    <div class="joms-module--toolbar joms-toolbar--desktop joms-module--toolbar-on clearfix">
        <?php if(isset($defaultLogo) && !empty($defaultLogo)){?>
        <div class="joms-module--toolbar__brand">
            <a href="<?php echo $logoUrl;?>">
                <img src="<?php echo $defaultLogo;?>" alt="Logo">
            </a>
        </div>
        <?php }?>

        <ul class="joms-list joms-module--toolbar__menu">
            <li>
                <a href="<?php echo CRoute::_('index.php?option=com_community&view=frontpage') ?>">
                    <svg viewBox="0 0 16 16" class="joms-icon">
                        <use xlink:href="<?php echo CRoute::getURI(); ?>#joms-icon-home"></use>
                    </svg>
                </a>
            </li>
            <li>
                <a class="joms-js--notification-general"
                    href="<?php echo CRoute::_('index.php?option=com_community&view=profile&task=notifications'); ?>"
                    onclick="joms.popup.notification.global(); return false;">
                    <svg viewBox="0 0 16 16" class="joms-icon">
                        <use xlink:href="<?php echo CRoute::getURI(); ?>#joms-icon-earth"></use>
                    </svg>
                    <span class="joms-notifications__label joms-js--notiflabel-general"><?php
                        echo ($newEventInviteCount) ? $newEventInviteCount : '';
                    ?></span>
                </a>
                <ul class="joms-popover joms-arrow--top joms-popover--toolbar-general">
                    <li class="joms-js--loading" style="display:block">
                        <img src="<?php echo JURI::root(true); ?>/components/com_community/assets/ajax-loader.gif" alt="loader">
                    </li>
                </ul>
            </li>
            <li>
                <a class="joms-js--notification-friendrequest"
                    href="<?php echo CRoute::_('index.php?option=com_community&view=friends&task=pending'); ?>"
                    onclick="joms.popup.notification.friend(); return false;">
                    <svg viewBox="0 0 16 16" class="joms-icon">
                        <use xlink:href="<?php echo CRoute::getURI(); ?>#joms-icon-users"></use>
                    </svg>
                    <span class="joms-notifications__label joms-js--notiflabel-frequest"><?php
                        echo ($newFriendInviteCount) ? $newFriendInviteCount : '';
                    ?></span>
                </a>
                <ul class="joms-popover joms-arrow--top joms-popover--toolbar-friendrequest">
                    <li class="joms-js--loading" style="display:block">
                        <img src="<?php echo JURI::root(true); ?>/components/com_community/assets/ajax-loader.gif" alt="loader">
                    </li>
                </ul>
            </li>
            <?php if($isMessageEnable): ?>
            <li class="joms-js--notification-chat-list-mobile">
                <a class="joms-js--notification-chat" data-ui-object="joms-dropdown-button" onclick="javascript:;" href="<?php echo CRoute::_('index.php?option=com_community&view=chat'); ?>">
                    <svg viewBox="0 0 16 16" class="joms-icon">
                        <use xlink:href="<?php echo CRoute::getURI(); ?>#joms-icon-envelope"></use>
                    </svg>
                    <span class="joms-notifications__label joms-js--notiflabel-chat"><?php echo $newChatCount > 0 ? $newChatCount : '' ?></span>
                </a>
                <ul class="joms-popover joms-arrow--top joms-popover--toolbar-chat" data-propagate="1" style="width: 440px">
                    <li class="joms-js--empty" style="display:none">
                        <span><?php echo JText::_('COM_COMMUNITY_CHAT_NOTIF_NO_NEW_MESSAGE') ?></span>
                    </li>
                    <li class="joms-js--loading" style="display:block">
                        <img src="<?php echo JURI::root(true); ?>/components/com_community/assets/ajax-loader.gif" alt="loader">
                    </li>
                    <div class="joms-js--notification-toolbar" style="display:none">
                        <a class="joms-button--neutral joms-button--full" href="<?php echo CRoute::_('index.php?option=com_community&view=chat'); ?>" style="width: 49%"><?php echo JText::_('COM_COMMUNITY_CHAT_NOTIF_SHOW_ALL') ?></a>
                        <a class="joms-button--neutral joms-js-mask_all_as_read" href="javascript:;" style="width: 49%;"><?php echo JText::_('Mark all as read') ?></a>
                    </div>
                </ul>
            </li>
            <?php endif; ?>
            <?php if($moduleParams->get('navigationmenu')) { ?>
                <?php foreach ($navMenuItems as $item): ?>
                    <li><a href="<?php echo CRoute::_($item->link); ?>"><?php echo JText::_($item->title); ?></a></li>
                <?php endforeach; ?>
            <?php } ?>

            <?php if($moduleParams->get('show_search')) { ?>
            <li class="joms-search joms-js--noremove joms-js--field">
                <form method="POST" action="<?php echo CRoute::_('index.php?option=com_community&view=search&task=advancesearch'); ?>">
                    <input type="text" name="q" class="joms-input reset-gap" placeholder="<?php echo JText::_('COM_COMMUNITY_SEARCH'); ?>" style="padding: 4px 10px;" >
                </form>
                <ul class="joms-dropdown joms-js--search-result">
                    <li class="joms-js--noremove joms-js--loading">
                        <img src="<?php echo JURI::root(true); ?>/components/com_community/assets/ajax-loader.gif" alt="loader">
                    </li>
                    <li class="joms-js--noremove joms-js--viewall">
                        <div>
                            <a href="javascript:" data-lang="<?php echo JText::_('COM_COMMUNITY_VIEW_ALL_N_RESULTS'); ?>"></a>
                            <form method="post" action="<?php echo CRoute::_('index.php?option=com_community&view=search&task=advancesearch'); ?>" style="height:1px;padding:0;margin:0">
                                <input type="hidden" name="q" value="">
                            </form>
                        </div>
                    </li>
                </ul>
            </li>
            <?php } ?>

        </ul>

        <ul class="joms-list joms-action joms-module--toolbar__action">
            <li>
                <div class="joms-avatar">
                    <a href="<?php echo CUrlHelper::userLink($user->id); ?>"><img src="<?php echo $user->getAvatar(); ?>" alt="<?php echo $user->getDisplayName(); ?>"></a>
                </div>
            </li>
            <li>
                <span class="joms-user joms-text--normal"><a href="<?php echo CUrlHelper::userLink($user->id); ?>"><?php echo $moduleParams->get('greeting').$user->getDisplayName(false, true); ?></a></span>
            </li>

            <li>
                <a class="joms-js--has-dropdown" data-ui-object="joms-dropdown-button" href="#">
                    <svg viewBox="0 0 16 16" class="joms-icon">
                        <use xlink:href="<?php echo CRoute::getURI(); ?>#joms-icon-cog"></use>
                    </svg>
                </a>
                <ul class="joms-dropdown">
                    <?php if($moduleParams->get('configurationmenu')) { ?>
                        <?php foreach ($configMenuItems as $item): ?>
                            <li><a href="<?php echo CRoute::_($item->link); ?>"><?php echo JText::_($item->title); ?></a></li>
                        <?php endforeach; ?>
                    <?php } else { ?>
                        <li><a href="<?php echo CRoute::_('index.php?option=com_community&view=profile&task=uploadAvatar'); ?>"><?php echo JText::_('MOD_COMMUNITY_TOOLBAR_CHANGE_AVATAR'); ?></a></li>
                        <li><a href="<?php echo CRoute::_('index.php?option=com_community&view=profile&task=edit'); ?>"><?php echo JText::_('MOD_COMMUNITY_TOOLBAR_EDIT_PROFILE'); ?></a></li>
                        <li><a href="<?php echo CRoute::_('index.php?option=com_community&view=profile&task=privacy'); ?>"><?php echo JText::_('MOD_COMMUNITY_TOOLBAR_CHANGE_PRIVACY'); ?></a></li>
                    <?php }  ?>
                </ul>
            </li>

            <li>
                <a class="joms-js--logout" href="javascript:void(0);" onclick="document.getElementById('js-bar-logout-form').submit();">
                    <svg viewBox="0 0 16 16" class="joms-icon">
                        <use xlink:href="<?php echo CRoute::getURI(); ?>#joms-icon-switch"></use>
                    </svg>
                </a>
            </li>
        </ul>
    </div>

    <div class="joms-module--toolbar joms-toolbar joms-module--toolbar-on">
        <?php if(isset($iconLogo) && !empty($iconLogo)){?>
        <div class="joms-module--toolbar__brand">
            <a href="<?php echo $logoUrl;?>">
                <img src="<?php echo $iconLogo;?>" alt="Logo">
            </a>
        </div>
        <?php }?>
        <ul>

            <?php if($moduleParams->get('navigationmenu')) { ?>
            <li>
                <a class="joms-js--has-dropdown" data-ui-object="joms-dropdown-button" href="#">
                    <svg viewBox="0 0 16 16" class="joms-icon">
                        <use xlink:href="<?php echo CRoute::getURI(); ?>#joms-icon-menu"></use>
                    </svg>
                </a>
                <ul class="joms-dropdown">
                    <li>
                        <a href="<?php echo CRoute::_('index.php?option=com_community&view=frontpage') ?>">
                            <svg viewBox="0 0 16 16" class="joms-icon">
                                <use xlink:href="<?php echo CRoute::getURI(); ?>#joms-icon-home"></use>
                            </svg>
                        </a>
                    </li>
                    <?php foreach ($navMenuItems as $item) {
                        echo '<li><a href="' . CRoute::_($item->link) . '">' . JText::_($item->title) . '</a></li>';
                    } ?>
                </ul>
            </li>
            <?php } else { ?>
            <li>
                <a href="<?php echo CRoute::_('index.php?option=com_community&view=frontpage') ?>">
                    <svg viewBox="0 0 16 16" class="joms-icon">
                        <use xlink:href="<?php echo CRoute::getURI(); ?>#joms-icon-home"></use>
                    </svg>
                </a>
            </li>
            <?php } ?>

            <li>
                <a class="joms-js--notification-general"
                    href="<?php echo CRoute::_('index.php?option=com_community&view=profile&task=notifications'); ?>"
                    onclick="joms.popup.notification.global(); return false;">
                    <svg viewBox="0 0 16 16" class="joms-icon">
                        <use xlink:href="<?php echo CRoute::getURI(); ?>#joms-icon-earth"></use>
                    </svg>
                    <span class="joms-notifications__label joms-js--notiflabel-general"><?php
                        echo ($newEventInviteCount) ? $newEventInviteCount : '';
                    ?></span>
                </a>
                <ul class="joms-popover joms-arrow--top joms-popover--toolbar-general">
                    <li class="joms-js--loading" style="display:block">
                        <img src="<?php echo JURI::root(true); ?>/components/com_community/assets/ajax-loader.gif" alt="loader">
                    </li>
                </ul>
            </li>
            <li>
                <a class="joms-js--notification-friendrequest"
                    href="<?php echo CRoute::_('index.php?option=com_community&view=friends&task=pending'); ?>"
                    onclick="joms.popup.notification.friend(); return false;">
                    <svg viewBox="0 0 16 16" class="joms-icon">
                        <use xlink:href="<?php echo CRoute::getURI(); ?>#joms-icon-users"></use>
                    </svg>
                    <span class="joms-notifications__label joms-js--notiflabel-frequest"><?php
                        echo ($newFriendInviteCount) ? $newFriendInviteCount : '';
                    ?></span>
                </a>
                <ul class="joms-popover joms-arrow--top joms-popover--toolbar-friendrequest">
                    <li class="joms-js--loading" style="display:block">
                        <img src="<?php echo JURI::root(true); ?>/components/com_community/assets/ajax-loader.gif" alt="loader">
                    </li>
                </ul>
            </li>
            <?php if($isMessageEnable): ?>
            <li class="joms-js--notification-chat-list-mobile">
                <a class="joms-js--notification-chat" data-ui-object="joms-dropdown-button" onclick="javascript:;" href="<?php echo CRoute::_('index.php?option=com_community&view=chat'); ?>">
                    <svg viewBox="0 0 16 16" class="joms-icon">
                        <use xlink:href="<?php echo CRoute::getURI(); ?>#joms-icon-envelope"></use>
                    </svg>
                    <span class="joms-notifications__label joms-js--notiflabel-chat"><?php echo $newChatCount > 0 ? $newChatCount : '' ?></span>
                </a>
                <ul class="joms-popover joms-arrow--top joms-popover--toolbar-chat" data-propagate="1">
                    <li class="joms-js--empty" style="display:none">
                        <span><?php echo JText::_('COM_COMMUNITY_CHAT_NOTIF_NO_NEW_MESSAGE') ?></span>
                    </li>
                    <li class="joms-js--loading" style="display:block">
                        <img src="<?php echo JURI::root(true); ?>/components/com_community/assets/ajax-loader.gif" alt="loader">
                    </li>
                    <div class="joms-js--notification-toolbar" style="display:none">
                        <a class="joms-button--neutral joms-button--full" href="<?php echo CRoute::_('index.php?option=com_community&view=chat'); ?>" style="width: 49%"><?php echo JText::_('COM_COMMUNITY_CHAT_NOTIF_SHOW_ALL') ?></a>
                        <a class="joms-button--neutral joms-js-mask_all_as_read" href="javascript:;" style="width: 49%;"><?php echo JText::_('Mark all as read') ?></a>
                    </div>
                </ul>
            </li>
            <?php endif ?>
            <?php if($moduleParams->get('show_search')) { ?>
            <li>
                <a class="joms-js--notification-search" href="javascript:" data-ui-object="joms-dropdown-button">
                    <svg viewBox="0 0 16 16" class="joms-icon">
                        <use xlink:href="<?php echo CRoute::getURI(); ?>#joms-icon-search"></use>
                    </svg>
                </a>
                <ul class="joms-popover joms-popover--toolbar-search">
                    <li class="joms-js--noremove joms-js--field">
                        <input type="text" class="joms-input" placeholder="<?php echo JText::_('COM_COMMUNITY_SEARCH'); ?>"
                            oninput="joms.view.toolbar.search(this, event);">
                    </li>
                    <li class="joms-js--noremove joms-js--loading">
                        <img src="<?php echo JURI::root(true); ?>/components/com_community/assets/ajax-loader.gif" alt="loader">
                    </li>
                    <li class="joms-js--noremove joms-js--viewall">
                        <div>
                            <a href="javascript:" class="joms-button--neutral joms-button--full"
                                data-lang="<?php echo JText::_('COM_COMMUNITY_VIEW_ALL_N_RESULTS'); ?>"></a>
                            <form method="post" action="<?php echo CRoute::_('index.php?option=com_community&view=search&task=advancesearch'); ?>">
                                <input type="hidden" name="q" value="">
                            </form>
                        </div>
                    </li>
                </ul>
            </li>
            <?php } ?>

            <li class="joms-module--toolbar__action">
                <div class="joms-avatar">
                    <a href="<?php echo CUrlHelper::userLink($user->id); ?>"><img src="<?php echo $user->getAvatar(); ?>" alt="<?php echo $user->getDisplayName(); ?>"></a>
                </div>

                <a class="joms-js--has-dropdown" data-ui-object="joms-dropdown-button" href="#">
                    <svg viewBox="0 0 16 16" class="joms-icon">
                        <use xlink:href="<?php echo CRoute::getURI(); ?>#joms-icon-cog"></use>
                    </svg>
                </a>
                <ul class="joms-dropdown">
                    <?php if($moduleParams->get('configurationmenu')) { ?>
                        <?php foreach ($configMenuItems as $item): ?>
                            <li><a href="<?php echo CRoute::_($item->link); ?>"><?php echo JText::_($item->title); ?></a></li>
                        <?php endforeach; ?>
                        <li><a class="joms-js--logout" href="javascript:void(0);" onclick="document.getElementById('js-bar-logout-form').submit();"><?php echo JText::_('MOD_COMMUNITY_TOOLBAR_LOGOUT'); ?></a></li>
                    <?php } else { ?>
                        <li><a href="<?php echo CRoute::_('index.php?option=com_community&view=profile&task=uploadAvatar'); ?>"><?php echo JText::_('MOD_COMMUNITY_TOOLBAR_CHANGE_AVATAR'); ?></a></li>
                        <li><a href="<?php echo CRoute::_('index.php?option=com_community&view=profile&task=edit'); ?>"><?php echo JText::_('MOD_COMMUNITY_TOOLBAR_EDIT_PROFILE'); ?></a></li>
                        <li><a href="<?php echo CRoute::_('index.php?option=com_community&view=profile&task=privacy'); ?>"><?php echo JText::_('MOD_COMMUNITY_TOOLBAR_CHANGE_PRIVACY'); ?></a></li>
                        <li><a class="joms-js--logout" href="javascript:void(0);" onclick="document.getElementById('js-bar-logout-form').submit();"><?php echo JText::_('MOD_COMMUNITY_TOOLBAR_LOGOUT'); ?></a></li>
                    <?php } ?>
                </ul>

            </li>
        </ul>
    </div>

    <form action="<?php echo JRoute::_('index.php', true); ?>" method="post" id="js-bar-logout-form" style="display: none;">
        <input type="hidden" name="option" value="com_users" />
        <input type="hidden" name="task" value="user.logout" />
        <input type="hidden" name="return" value="<?php echo $logoutLink; ?>" />
        <?php echo JHtml::_('form.token'); ?>
    </form>

    <script>
        (function() {
            var $mod, $input, $ddbtn, $dd, xhr;

            function init() {
                $mod = window.jQuery('.joms-module--toolbar'),
                $input = $mod.find('[name=q]');
                $input.on('keyup', search );
                $ddbtn = $mod.find('.joms-js--has-dropdown');
                $dd = $mod.find('.joms-dropdown');
                $ddbtn.on('click', toggleDd );
            }

            function search() {
                var keyword = $input.val() || '';
                if ( !keyword.replace(/^\s+|\s+$/g, '') ) {
                    return;
                }

                if ( xhr ) {
                    xhr.abort();
                }

                var $dropdown = $mod.find('.joms-js--search-result'),
                    $loading = $dropdown.find('.joms-js--loading'),
                    $viewall = $dropdown.find('.joms-js--viewall');

                $dropdown.find('li:not(.joms-js--noremove)').remove();
                $viewall.hide();
                $loading.show();

                xhr = joms.ajax({
                    func: 'search,ajaxSearch',
                    data: [ keyword ],
                    callback: function( json ) {
                        var $form, $btn, html, i, max;

                        $loading.hide();

                        if ( json.error ) {
                            html = '<li class="joms-js--error">' + json.error + '</li>';
                            $loading.before( html );
                            return;
                        }

                        if ( json.length ) {
                            html = '';
                            max = Math.min( 3, json.length );
                            for ( i = 0; i < max; i++ ) {
                                html += '<li><div class="joms-popover__avatar"><div class="joms-avatar">';
                                html += '<img src="' + json[i].thumb + '"></div></div>';
                                html += '<div class="joms-popover__content">';
                                html += '<h5><a href="' + json[i].url + '">' + json[i].name + '</a></h5>';
                                html += '</div></li>';
                            }

                            $form = $viewall.find('form');
                            $form.find('input').val( keyword );
                            $viewall.off('click', 'a').on('click', 'a', function() {
                                $form[0].submit();
                            });

                            $btn = $viewall.find('a');
                            $btn.html( $btn.data('lang').replace( '%1$s', json.length ) );

                            $loading.before( html );
                            $viewall.show();
                            $dropdown.show();
                        }
                    }
                });
            }

            function toggleDd() {
                $dd.removeClass('joms-dropdown-r joms-dropdown-t');

                setTimeout(function() {
                    var winWidth = window.innerWidth,
                        winHeight = window.innerHeight,
                        offset, width, height,
                        className = [];

                    if ( $dd.is(':visible') ) {
                        offset = $dd.offset();
                        width = $dd.width();
                        height = $dd.height();
                        if ( offset.left + width > winWidth ) {
                            className.push('joms-dropdown-r');
                        }
                        if ( offset.top + height > winHeight ) {
                            className.push('joms-dropdown-t');
                        }
                        if ( className.length ) {
                            $dd.addClass( className.join(' ') );
                        }
                    }
                });
            }

            var timer = setInterval(function() {
                if ( window.jQuery ) {
                    clearInterval( timer );
                    init();
                }
            }, 1000 );
        })();
    </script>

<?php } else { ?>

    <div class="joms-module--toolbar joms-toolbar--desktop">
        <?php if(isset($defaultLogo) && !empty($defaultLogo)){?>
        <div class="joms-module--toolbar__brand">
            <a href="<?php echo $logoUrl;?>">
                <img src="<?php echo $defaultLogo;?>" alt="Logo">
            </a>
        </div>
        <?php }?>

        <form class="joms-form" action="<?php echo CRoute::_('index.php?option=' . COM_USER_NAME . '&task=' . COM_USER_TAKS_LOGIN); ?>" method="post" name="login" >
            <div class="joms-input--append">
                <svg viewBox="0 0 16 16" class="joms-icon">
                    <use xlink:href="<?php echo CRoute::getURI(); ?>#joms-icon-user"></use>
                </svg>
                <input type="text" name="username" class="joms-input" placeholder="<?php echo JText::_('MOD_COMMUNITY_TOOLBAR_USERNAME'); ?>">
            </div>
            <div class="joms-input--append">
                <svg viewBox="0 0 16 16" class="joms-icon">
                    <use xlink:href="<?php echo CRoute::getURI(); ?>#joms-icon-lock"></use>
                </svg>
                <input type="password" name="password" class="joms-input" placeholder="<?php echo JText::_('MOD_COMMUNITY_TOOLBAR_PASSWORD'); ?>">
            </div>

            <?php if(CSystemHelper::tfaEnabled()){?>
                <div class="joms-input--append">
                    <svg viewBox="0 0 16 16" class="joms-icon">
                        <use xlink:href="<?php echo CRoute::getURI(); ?>#joms-icon-key"></use>
                    </svg>
                    <input type="text" name="secretkey" class="joms-input" placeholder="<?php echo JText::_('COM_COMMUNITY_AUTHENTICATION_KEY'); ?>">
                </div>
            <?php } ?>

            <div class="joms-button__wrapper">
                <button class="joms-button--primary"><?php echo JText::_('MOD_COMMUNITY_TOOLBAR_LOGIN'); ?></button>
            </div>

            <?php if ($usersConfig->get('allowUserRegistration')) : ?>
            <div class="joms-button__wrapper">
              &nbsp;<a class="joms-button--secondary" href="<?php echo CRoute::_('index.php?option=com_community&view=register', false); ?>">
                <?php echo JText::_('MOD_COMMUNITY_TOOLBAR_REGISTER'); ?>
              </a>
            </div>
            <?php endif; ?>

            <?php if (!$usersConfig->get('allowUserRegistration') && $config->get('invite_only_request')) : ?>
            <div class="joms-button__wrapper">
              &nbsp;<a class="joms-button--secondary" href="<?php echo CRoute::_('index.php?option=com_community&view=registerinvite', false); ?>">
                <?php echo JText::_('MOD_COMMUNITY_TOLLBAR_REQUEST_INVITE'); ?>
              </a>
            </div>
            <?php endif; ?>

            <input type="hidden" name="option" value="<?php echo COM_USER_NAME; ?>"/>
            <input type="hidden" name="task" value="<?php echo COM_USER_TAKS_LOGIN; ?>"/>
            <input type="hidden" name="return" value="<?php echo $loginLink; ?>"/>
            <div class="joms-js--token" style="display: none"><?php echo JHTML::_('form.token'); ?></div>

            <?php if ( JPluginHelper::isEnabled('system', 'remember') && $moduleParams->get('remember_me') != 3) { ?>
                <div class="joms-checkbox" style="<?php if($moduleParams->get('remember_me') == 2){ echo 'visibility:hidden'; } ?>">
                    <input id="jomsocial-toolbar-rememberme" type="checkbox" value="yes" name="remember" <?php if($moduleParams->get('remember_me') == 0 || $moduleParams->get('remember_me') == 2){ echo 'checked'; }?>>
                    <span><label for='jomsocial-toolbar-rememberme' style="font-size: inherit; padding: 0;"><?php echo JText::_('MOD_COMMUNITY_TOOLBAR_REMEMBER_ME'); ?></label></span>
                </div>
            <?php } ?>

            <?php if($moduleParams->get('show_forgotusr')) { ?>
                <div class="joms-link__wrapper">
                    <a href="<?php echo CRoute::_('index.php?option=' . COM_USER_NAME . '&view=remind'); ?>"><?php echo JText::_('MOD_COMMUNITY_TOOLBAR_FORGET_USERNAME'); ?></a>
                </div>
            <?php } ?>

            <?php if($moduleParams->get('show_forgotpwd')) { ?>
                <div class="joms-link__wrapper">
                    <a href="<?php echo CRoute::_('index.php?option=' . COM_USER_NAME . '&view=reset'); ?>"><?php echo JText::_('MOD_COMMUNITY_TOOLBAR_FORGET_PASSWORD'); ?></a>
                </div>
            <?php } ?>


            <?php if($moduleParams->get('show_facebook')) {
                $config = CFactory::getConfig();
                $usersConfig = JComponentHelper::getParams('com_users');
                $fbHtml = '';

                if ($config->get('fbconnectkey') && $config->get('fbconnectsecret') && !$config->get('usejfbc')) {
                    $facebook = new CFacebook();
                    $fbHtml = $facebook->getLoginHTML();
                }

                if ($config->get('usejfbc')) {
                    if (class_exists('JFBCFactory')) {
                        $providers = JFBCFactory::getAllProviders();
                        $fbHtml = '';
                        foreach($providers as $p){
                            $fbHtml .= $p->loginButton();
                        }
                    }
                }
                echo $fbHtml;
            } ?>

            <?php if($moduleParams->get('show_twitter')) {
                $config = CFactory::getConfig();
                $usersConfig = JComponentHelper::getParams('com_users');

                $twitterHtml = '';

                /* Twitter login */
                if ($config->get('twitterconnectkey') && $config->get('twitterconnectsecret') && !$config->get('usejfbc')) {
                    $twitter = new CTwitter();
                    $twitterHtml = $twitter->getLoginHTML();
                }
        
                echo $twitterHtml;
            } ?>

            <?php if($moduleParams->get('show_linkedin')) {
                $config = CFactory::getConfig();
                $usersConfig = JComponentHelper::getParams('com_users');
                $linkedinHtml = '';

                /* LinkedIn login */
                if ($config->get('linkedinclientid') && $config->get('linkedinsecret') && !$config->get('usejfbc')) {
                    $linkedin = new CLinkedin();
                    $linkedinHtml = $linkedin->getLoginHTML();
                }

                echo $linkedinHtml;
            } ?>

            <?php if($moduleParams->get('show_google')) {
                $document = JFactory::getDocument();
                $config = CFactory::getConfig();
                $usersConfig = JComponentHelper::getParams('com_users');
                $googleHtml = '';

                /* Google login */
                if ($config->get('googleclientid') && !$config->get('usejfbc')) {
                    $google = new CGoogle();
                    $googleHtml = $google->getLoginHTML('bar_desktop');

                    $document->addCustomTag('<script src="https://apis.google.com/js/api:client.js"></script>');
                }

                echo $googleHtml;
            } ?>
        </form>

    </div>

    <div class="joms-module--toolbar joms-toolbar--mobile">
        <?php if(isset($iconLogo) && !empty($iconLogo)){?>
        <div class="joms-module--toolbar__brand">
            <a href="<?php echo $logoUrl;?>">
                <img src="<?php echo $iconLogo;?>" alt="Logo">
            </a>
        </div>
        <?php }?>

        <a class="joms-button--neutral" href="javascript:" data-ui-object="joms-dropdown-button">
            <svg viewBox="0 0 16 16" class="joms-icon">
                <use xlink:href="<?php echo CRoute::getURI(); ?>#joms-icon-user"></use>
            </svg>
            <?php echo JText::_('MOD_COMMUNITY_TOOLBAR_OPEN_MODAL'); ?>
        </a>
        <ul class="joms-dropdown joms-module--toolbar__modal">
            <form class="joms-form" action="<?php echo CRoute::_('index.php?option=' . COM_USER_NAME . '&task=' . COM_USER_TAKS_LOGIN); ?>" method="post" name="login" >
                <div class="joms-input--append">
                    <svg viewBox="0 0 16 16" class="joms-icon">
                        <use xlink:href="<?php echo CRoute::getURI(); ?>#joms-icon-user"></use>
                    </svg>
                    <input type="text" name="username" class="joms-input" placeholder="<?php echo JText::_('MOD_COMMUNITY_TOOLBAR_USERNAME'); ?>">
                </div>
                <div class="joms-input--append">
                    <svg viewBox="0 0 16 16" class="joms-icon">
                        <use xlink:href="<?php echo CRoute::getURI(); ?>#joms-icon-lock"></use>
                    </svg>
                    <input type="password" name="password" class="joms-input" placeholder="<?php echo JText::_('MOD_COMMUNITY_TOOLBAR_PASSWORD'); ?>">
                </div>

                <?php if(CSystemHelper::tfaEnabled()){?>
                    <div class="joms-input--append">
                        <svg viewBox="0 0 16 16" class="joms-icon">
                            <use xlink:href="<?php echo CRoute::getURI(); ?>#joms-icon-key"></use>
                        </svg>
                        <input type="text" name="secretkey" class="joms-input" placeholder="<?php echo JText::_('COM_COMMUNITY_AUTHENTICATION_KEY'); ?>">
                    </div>
                <?php } ?>

                <button class="joms-button--primary"><?php echo JText::_('MOD_COMMUNITY_TOOLBAR_LOGIN'); ?></button>

                <?php if ($usersConfig->get('allowUserRegistration')) : ?>
                  &nbsp;<a class="joms-button--secondary" href="<?php echo CRoute::_('index.php?option=com_community&view=register', false); ?>">
                    <?php echo JText::_('MOD_COMMUNITY_TOOLBAR_REGISTER'); ?>
                  </a>
                <?php endif; ?>

                <input type="hidden" name="option" value="<?php echo COM_USER_NAME; ?>"/>
                <input type="hidden" name="task" value="<?php echo COM_USER_TAKS_LOGIN; ?>"/>
                <input type="hidden" name="return" value="<?php echo $loginLink; ?>"/>
                <div class="joms-js--token" style="display: none"><?php echo JHTML::_('form.token'); ?></div>

                <?php if ( JPluginHelper::isEnabled('system', 'remember') && $moduleParams->get('remember_me') != 3) { ?>
                    <div class="joms-checkbox" style="<?php if($moduleParams->get('remember_me') == 2){ echo 'visibility:hidden'; } ?>">
                        <input type="checkbox" value="yes" name="remember" <?php if($moduleParams->get('remember_me') == 0 || $moduleParams->get('remember_me') == 2){ echo 'checked'; }?>>
                        <span><?php echo JText::_('MOD_COMMUNITY_TOOLBAR_REMEMBER_ME'); ?></span>
                    </div>
                <?php } ?>

                <?php if($moduleParams->get('show_forgotusr')) { ?>
                    <div class="joms-link__wrapper">
                        <a href="<?php echo CRoute::_('index.php?option=' . COM_USER_NAME . '&view=remind'); ?>"><?php echo JText::_('MOD_COMMUNITY_TOOLBAR_FORGET_USERNAME'); ?></a>
                    </div>
                <?php } ?>

                <?php if($moduleParams->get('show_forgotpwd')) { ?>
                    <div class="joms-link__wrapper">
                        <a href="<?php echo CRoute::_('index.php?option=' . COM_USER_NAME . '&view=reset'); ?>"><?php echo JText::_('MOD_COMMUNITY_TOOLBAR_FORGET_PASSWORD'); ?></a>
                    </div>
                <?php } ?>


                <?php if($moduleParams->get('show_facebook')) {
                    $config = CFactory::getConfig();
                    $usersConfig = JComponentHelper::getParams('com_users');
                    $fbHtml = '';

                    if ($config->get('fbconnectkey') && $config->get('fbconnectsecret') && !$config->get('usejfbc')) {
                        $facebook = new CFacebook();
                        $fbHtml = $facebook->getLoginHTML();
                    }

                    if ($config->get('usejfbc')) {
                        if (class_exists('JFBCFactory')) {
                            $providers = JFBCFactory::getAllProviders();
                            $fbHtml = '';
                            foreach($providers as $p){
                                $fbHtml .= $p->loginButton();
                            }
                        }
                    }
                    echo $fbHtml;
                } ?>

                <?php if($moduleParams->get('show_twitter')) {
                    $config = CFactory::getConfig();
                    $usersConfig = JComponentHelper::getParams('com_users');

                    $twitterHtml = '';

                    /* Twitter login */
                    if ($config->get('twitterconnectkey') && $config->get('twitterconnectsecret') && !$config->get('usejfbc')) {
                        $twitter = new CTwitter();
                        $twitterHtml = $twitter->getLoginHTML();
                    }
            
                    echo $twitterHtml;
                } ?>

                <?php if($moduleParams->get('show_linkedin')) {
                    $config = CFactory::getConfig();
                    $usersConfig = JComponentHelper::getParams('com_users');
                    $linkedinHtml = '';

                    /* LinkedIn login */
                    if ($config->get('linkedinclientid') && $config->get('linkedinsecret') && !$config->get('usejfbc')) {
                        $linkedin = new CLinkedin();
                        $linkedinHtml = $linkedin->getLoginHTML();
                    }

                    echo $linkedinHtml;
                } ?>

                <?php if($moduleParams->get('show_google')) {
                    $document = JFactory::getDocument();
                    $config = CFactory::getConfig();
                    $usersConfig = JComponentHelper::getParams('com_users');
                    $googleHtml = '';

                    /* Google login */
                    if ($config->get('googleclientid') && !$config->get('usejfbc')) {
                        $google = new CGoogle();
                        $googleHtml = $google->getLoginHTML('bar_mobile');

                        $document->addCustomTag('<script src="https://apis.google.com/js/api:client.js"></script>');
                    }

                    echo $googleHtml;
                } ?>
            </form>
        </ul>
    </div>

<?php  }?>


