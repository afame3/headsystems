<?php
/**
 * @copyright (C) 2015 iJoomla, Inc. - All rights reserved.
 * @license GNU General Public License, version 2 (http://www.gnu.org/licenses/gpl-2.0.html)
 * @author iJoomla.com <webmaster@ijoomla.com>
 * @url https://www.jomsocial.com/license-agreement
 * The PHP code portions are distributed under the GPL license. If not otherwise stated, all images, manuals, cascading style sheets, and included JavaScript *are NOT GPL, and are released under the IJOOMLA Proprietary Use License v1.0
 * More info at https://www.jomsocial.com/license-agreement
 */
defined('_JEXEC') or die('Unauthorized Access'); ?>

<?php

$male = JURI::root(true) . '/components/com_community/assets/user-Male.png';
$female = JURI::root(true) . '/components/com_community/assets/user-Female.png';
?>
<div class="joms-module--friendssuggestions">
    <?php if(!CFactory::getUser()->id) {?>
        <!-- If not logged in -->
        <div class="joms-blankslate">
            <?php echo JText::_('MOD_COMMUNITY_FRIENDSSUGGESTIONS_GUEST'); ?>
        </div>
    <?php
    }elseif(count($users)) {
        $friendsModel = CFactory::getModel('Friends');

        echo '<ul class="joms-list--general">';

        foreach ($users as $userid) {
            $user = CFactory::getUser($userid); //user will contain all the user information that u can suggest to the current user
            $totalMutualFriends = count($friendsModel->getFriends($user->id, 'latest', false, 'mutual'));
            if(!$user->id){ continue; }
            ?>
            
                <li class="joms-list__item">
                    <div class="joms-list__avatar">
                        <a href="<?php echo CRoute::_('index.php?option=com_community&view=profile&userid=' . $user->id) ?>"
                           class="joms-avatar ">
                            <img src="<?php echo $user->getAvatar(); ?>" alt="<?php echo $user->getDisplayName(); ?>">
                        </a>
                    </div>
                    <div class="joms-list__body">
                        <a href="<?php echo CRoute::_('index.php?option=com_community&view=profile&userid=' . $user->id) ?>">
                            <h4 class="joms-text--username"><?php echo $user->getDisplayName(); ?></h4>
                        </a>

                        <p class="joms-text--light"><?php echo $totalMutualFriends; ?> <?php echo JText::_('MOD_COMMUNITY_FRIENDSSUGGESTIONS_MUTUAL_FRIENDS') ?></p>
                        <!-- will be replaced with <?php echo CFriendsHelper::getUserFriendDropdown($user->id); ?> after backend side is finished -->
                        <?php if (CFactory::getUser()->authorise('community.friendrequest', 'com_community')) { ?>
                            <span class="joms-button--neutral joms-button--smallest" onclick="joms.api.friendAdd('<?php echo $user->id; ?>')"><?php echo JText::_('MOD_COMMUNITY_FRIENDSSUGGESTIONS_ADD_FRIEND'); ?></span>
                        <?php } ?>
                    </div>
                </li>
            <?php
        }

        echo '</ul>';
    } else {
        ?>
        <div class="joms-blankslate"><?php echo JText::_('MOD_COMMUNITY_FRIENDSSUGGESTIONS_NO_FRIEND') ?></div>
    <?php } ?>

    <!--<div class="joms-gap"></div>-->
    <!--<a href="javascript:void(0);" class="joms-text--skip">Skip to next people</a>-->

</div>

