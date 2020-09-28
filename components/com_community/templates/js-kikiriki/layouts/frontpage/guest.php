<?php
/**
* @copyright (C) 2013 iJoomla, Inc. - All rights reserved.
* @license GNU General Public License, version 2 (http://www.gnu.org/licenses/gpl-2.0.html)
* @author iJoomla.com <webmaster@ijoomla.com>
* @url https://www.jomsocial.com/license-agreement
* The PHP code portions are distributed under the GPL license. If not otherwise stated, all images, manuals, cascading style sheets, and included JavaScript *are NOT GPL, and are released under the IJOOMLA Proprietary Use License v1.0
* More info at https://www.jomsocial.com/license-agreement
*/
defined('_JEXEC') or die();
$JSimages = 'no-image';
$JSbackground = '';

if (isset($settings) && $settings['general']['enable-frontpage-image']) {
    $JSimages = 'has-image';
    $JSbackground = 'background-image:url('.$heroImage.');';
}

?>

<div class="joms-landing <?php echo $JSimages ;?>" style="<?php echo $JSbackground;?>">
    
    <div class="joms-landing__action <?php if(CSystemHelper::tfaEnabled()) { echo 'tfaenabled'; } ?>">
        
        <?php if (isset($settings) && $settings['general']['enable-frontpage-paragraph']): ?>
        <div class="joms-landing__text">
            <h2><?php echo JText::_('COM_COMMUNITY_GET_CONNECTED_TITLE'); ?></h2>
            <p><?php echo JText::_('COM_COMMUNITY_HERO_PARAGRAPH'); ?></p>
        </div>
        <?php endif; ?>

        <?php if (isset($settings) && $settings['general']['enable-frontpage-login']): ?>
        <div class="joms-user_action">
        
            <div class="joms-login">
                <a class="joms-button--login">
                    <?php echo JText::_('COM_COMMUNITY_LOGIN') ?>

                    <span>
                        <svg viewBox="0 0 16 16" class="joms-icon">
                            <use xlink:href="#joms-icon-arrow-down"></use>
                        </svg>
                    </span>
                </a>

                <div class="joms-login_dropdown">
                
                    <form class="joms-form joms-js-form--login" action="<?php echo CRoute::getURI(); ?>" method="post" name="login" id="form-login">
                        <div class="joms-input--append">
                            <span>
                                <svg viewBox="0 0 16 16" class="joms-icon">
                                    <use xlink:href="<?php echo CRoute::getURI(); ?>#joms-icon-user"></use>
                                </svg>
                            </span>

                            <input type="text" name="username" class="joms-input" placeholder="<?php echo JText::_('COM_COMMUNITY_USERNAME'); ?>">
                        </div>
                        <div class="joms-input--append">
                            <span>
                                <svg viewBox="0 0 16 16" class="joms-icon">
                                    <use xlink:href="<?php echo CRoute::getURI(); ?>#joms-icon-lock"></use>
                                </svg>
                            </span>

                            <input type="password" name="password" class="joms-input" placeholder="<?php echo JText::_('COM_COMMUNITY_PASSWORD'); ?>">
                        </div>
                        <?php if(CSystemHelper::tfaEnabled()){?>
                            <div class="joms-input--append">
                                <svg viewBox="0 0 16 16" class="joms-icon">
                                    <use xlink:href="<?php echo CRoute::getURI(); ?>#joms-icon-key"></use>
                                </svg>
                                <input type="text" name="secretkey" class="joms-input" placeholder="<?php echo JText::_('COM_COMMUNITY_AUTHENTICATION_KEY'); ?>">
                            </div>
                        <?php } ?>

                        <div class="jom-action_login">
                            <?php if (JPluginHelper::isEnabled('system', 'remember')) : ?>
                                <div class="joms-checkbox">
                                    <input type="checkbox" value="yes" name="remember">
                                    <span><?php echo JText::_('COM_COMMUNITY_REMEMBER_MY_DETAILS'); ?></span>
                                </div>
                            <?php endif; ?>

                            <button class="joms-button--login"><?php echo JText::_('COM_COMMUNITY_LOGIN') ?></button>
                        </div>

                        <div class="joms-landing__signup">
                        <?php if ( $fbHtml ) { ?>
                            <?php echo $fbHtml;?>
                        <?php } ?>
                         </div>

                        <div class="joms-other">
                        <a href="<?php echo CRoute::_('index.php?option=' . COM_USER_NAME . '&view=remind'); ?>"><?php echo JText::_('COM_COMMUNITY_FORGOT_USERNAME_LOGIN'); ?></a>
                        <a href="<?php echo CRoute::_('index.php?option=' . COM_USER_NAME . '&view=reset'); ?>"
                           tabindex="6"><?php echo JText::_('COM_COMMUNITY_FORGOT_PASSWORD_LOGIN'); ?></a>
                        <?php if ($useractivation) { ?>
                            <a href="<?php echo CRoute::_('index.php?option=com_community&view=register&task=activation'); ?>"
                               class="login-forgot-username"><?php echo JText::_('COM_COMMUNITY_RESEND_ACTIVATION_CODE'); ?></a>
                        <?php } ?>
                        </div>
                        <input type="hidden" name="option" value="<?php echo COM_USER_NAME; ?>"/>
                        <input type="hidden" name="task" value="<?php echo COM_USER_TAKS_LOGIN; ?>"/>
                        <input type="hidden" name="return" value="<?php echo $return; ?>"/>
                        <div class="joms-js--token"><?php echo JHTML::_('form.token'); ?></div>
                    </form>
                </div>
            </div>

            <?php  if ($allowUserRegister) : ?>
                <div class="joms-register">
                    <button class="joms-button--signup"
                            onclick="location.href='<?php echo CRoute::_('index.php?option=com_community&view=register', false); ?>'">
                        <span><svg viewBox="0 0 16 16" class="joms-icon joms-icon--white">
                            <use xlink:href="<?php echo CRoute::getURI(); ?>#joms-icon-signup"></use>
                        </svg></span>
                        <?php echo JText::_('COM_COMMUNITY_JOIN_US_NOW'); ?></button>
                </div>
            <?php  endif; ?>
        </div>

        <script>
            joms.onStart(function( $ ) {
                $('.joms-js-form--login').on( 'submit', function( e ) {
                    e.preventDefault();
                    e.stopPropagation();
                    joms.ajax({
                        func: 'system,ajaxGetLoginFormToken',
                        data: [],
                        callback: function( json ) {
                            var form = $('.joms-js-form--login');
                            if ( json.token ) {
                                form.find('.joms-js--token input').prop('name', json.token);
                            }
                            form.off('submit').submit();
                        }
                    });
                }).find('[name=username],[name=password],[name=secretkey]').attr('autocapitalize', 'off');
            });
        </script>
        <?php endif; ?>
    </div>
</div>
