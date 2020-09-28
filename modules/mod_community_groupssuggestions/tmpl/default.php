<?php
/**
* @copyright (C) 2015 iJoomla, Inc. - All rights reserved.
* @license GNU General Public License, version 2 (http://www.gnu.org/licenses/gpl-2.0.html)
* @author iJoomla.com <webmaster@ijoomla.com>
* @url https://www.jomsocial.com/license-agreement
* The PHP code portions are distributed under the GPL license. If not otherwise stated, all images, manuals, cascading style sheets, and included JavaScript *are NOT GPL, and are released under the IJOOMLA Proprietary Use License v1.0
* More info at https://www.jomsocial.com/license-agreement
*/
defined( '_JEXEC' ) or die( 'Unauthorized Access' ); ?>

<?php if($user->id){ ?>
    <!-- If logged in -->
    <?php if(!empty($groups)){
        $groupModel = CFactory::getModel('groups');
        $discussModel = CFactory::getModel('discussions');
        $eventsModel = CFactory::getModel('Events');
        foreach($groups as $groupid){
            $group = JTable::getInstance('Group','CTable');
            $group->load($groupid);
            $discussions = $discussModel->getDiscussionTopics($groupid, '10', 0);
            $creator = CFactory::getUser($group->ownerid);
            $totalMembers = $groupModel->getMembersCount($group->id);
            $groupUrl = CRoute::_('index.php?option=com_community&view=groups&task=viewgroup&groupid='.$group->id);

            $eventUrl = ($group->approvals) ? $groupUrl : CRoute::_('index.php?option=com_community&view=events&groupid='.$group->id);
            $discussionUrl = ($group->approvals) ? $groupUrl : CRoute::_('index.php?option=com_community&view=groups&task=viewdiscussions&groupid='.$group->id);

            $totalDiscussion = $discussModel->total ? $discussModel->total : 0;
            $totalEvents = $eventsModel->getTotalGroupEvents($group->id);
            ?>

            <div class="joms-module--groupssuggestions">

                <div class="joms-hcard flat">
                    <a href="<?php echo $groupUrl; ?>">
                        <div class="joms-hcard__cover">
                            <img src="<?php echo $group->getCover(); ?>" style="width:100%;">

                            <div class="joms-focus__date cover">
                                <svg viewBox="0 0 12 20" class="joms-icon joms-icon--white">
                                    <use xlink:href="<?php echo $groupUrl; ?>#joms-icon-users"></use>
                                </svg>
                                <br>
                                <?php echo $totalMembers; ?>
                            </div>
                        </div>
                    </a>

                    <h4 class="joms-hcard__title reset-gap"><a href="<?php echo $groupUrl; ?>"><?php echo JHTML::_('string.truncate', strip_tags($group->name), 30, false, false); ?></a></h4>

                    <ul class="joms-focus__link">
                        <li><a href="<?php echo $discussionUrl; ?>">
                                <svg viewBox="0 0 18 18" class="joms-icon">
                                    <use xlink:href="<?php echo $discussionUrl; ?>#joms-icon-bubbles"></use>
                                </svg>
                                <span class="joms-text--light"><?php echo $totalDiscussion ?> <?php echo JText::_((CStringHelper::isPlural($totalDiscussion)) ? 'MOD_COMMUNITY_GROUPSSUGGESTIONS_DISCUSSIONS' : 'MOD_COMMUNITY_GROUPSSUGGESTIONS_DISCUSSION'); ?></span></a>
                            </a></li>
                        <?php if(CFactory::getConfig()->get('group_events')){ ?>
                        <li><a href="<?php echo $eventUrl; ?>">
                                <svg viewBox="0 0 12 20" class="joms-icon">
                                    <use xlink:href="<?php echo $eventUrl; ?>#joms-icon-calendar"></use>
                                </svg>
                                <span class="joms-text--light"><?php echo $totalEvents;?> <?php echo JText::_((CStringHelper::isPlural($totalEvents)) ? 'MOD_COMMUNITY_GROUPSSUGGESTIONS_EVENTS' : 'MOD_COMMUNITY_GROUPSSUGGESTIONS_EVENT'); ?></span></a>
                        </li>
                        <?php } ?>
                    </ul>

                    <div class="joms-hcard__body">
                        <p class="joms-text--small"><?php echo $group->summary; ?></p>
                        <span class="joms-text--small"><?php echo JText::_('MOD_COMMUNITY_GROUPSSUGGESTIONS_CREATED_BY'); ?> <a href="javascript:void(0);" class="joms-text--small"><?php echo $creator->getDisplayName(); ?></a></span>
                    </div>

                    <div class="joms-hcard__actions">
                        <a href="<?php echo $groupUrl; ?>" class="joms-button--neutral joms-button--small">
                            <?php echo JText::_('MOD_COMMUNITY_GROUPSSUGGESTIONS_JOIN_GROUP'); ?>
                        </a>
                    </div>

                </div>
                <div class="joms-gap"></div>
    <!--            <a href="javascript:void(0);" class="joms-text--skip">Skip to other groups</a>-->
            </div>

        <?php } ?>

    <?php } else { ?>

        <div class="joms-blankslate">
            <?php echo JText::_('MOD_COMMUNITY_GROUPSSUGGESTIONS_EMPTY'); ?>
        </div>

    <?php } ?>

<?php }else{ ?>
    <!-- If not logged in -->
    <div class="joms-blankslate">
        <?php echo JText::_('MOD_COMMUNITY_GROUPSSUGGESTIONS_GUEST'); ?>
    </div>

<?php }; ?>




