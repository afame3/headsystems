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

$cover = JURI::root(true) . '/components/com_community/assets/cover-event.png';
$avatar = JURI::root(true) . '/components/com_community/assets/user-Male.png';
$url = CRoute::_('index.php?option=com_community');
require_once(JPATH_ROOT . '/components/com_community/libraries/core.php');
$svgPath = CFactory::getPath('template://assets/icon/joms-icon.svg');
include_once $svgPath;

?>

<?php if($user->id){ ?>

    <?php if ($events) {
        foreach ($events as $eventId) {
            $event = JTable::getInstance('Event','CTable');
            $event->load($eventId);
            $creator = CFactory::getUser($event->creator);
            $eventUrl = CRoute::_('index.php?option=com_community&view=events&task=viewevent&eventid='.$event->id);
            ?>
            <div class="joms-module--eventssuggestions">

                <div class="joms-hcard flat">
                    <a href="<?php echo $eventUrl; ?>">
                        <div class="joms-hcard__cover">
                            <img src="<?php echo $event->getCover(); ?>" style="width:100%;">

                            <div class="joms-focus__date cover">
                                <span><?php echo JText::_( CEventHelper::formatStartDate($event, 'M') ); ?></span>
                                <span><?php echo JText::_( CEventHelper::formatStartDate($event, 'd') ); ?></span>
                            </div>
                        </div>
                    </a>

                    <h4 class="joms-hcard__title reset-gap"><?php echo JHTML::_('string.truncate', strip_tags($event->title), 30, false, false); ?></h4>

                    <ul class="joms-focus__link">
                        <li><a href="<?php echo CRoute::_('index.php?option=com_community&view=events&task=viewguest&type=1&eventid='.$event->id) ?>"><span class="joms-text--light"><?php echo $event->getMembersCount( COMMUNITY_EVENT_STATUS_ATTEND ); ?> <?php echo JText::_('MOD_COMMUNITY_EVENTSSUGGESTIONS_GOING'); ?></span></a></li>
                        <li><a href="https://maps.google.com/?q=<?php echo $event->latitude.','.$event->longitude; ?>">
                                <svg viewBox="0 0 12 20" class="joms-icon">
                                    <use xlink:href="<?php echo $url; ?>#joms-icon-location"></use>
                                </svg>
                                <span class="joms-text--light"><?php echo $event->location; ?></span></a></li>
                    </ul>

                    <!--<div class="joms-text--small">

                        <?php echo JText::_('MOD_COMMUNITY_EVENTSSUGGESTIONS_STARTS_AT').' '.$event->getStartDate(true,'H:i').$event->getStartDate(true,' d. M Y').'<br/>'
                            .JText::_('MOD_COMMUNITY_EVENTSSUGGESTIONS_ENDS_AT').' '.$event->getEndDate(true,'H:i').$event->getEndDate(true,' d. M Y'); ?>
                    </div>-->

                    <div class="joms-hcard__body">
                        <p class="joms-text--small"><?php echo htmlentities($event->summary); ?></p>
                        <span class="joms-text--small"><?php echo JText::_('MOD_COMMUNITY_EVENTSSUGGESTIONS_CREATED_BY'); ?> <a href="<?php echo CRoute::_('index.php?option=com_community&view=profile&userid='.$creator->id) ?>" class="joms-text--small"><?php echo $creator->getDisplayName(); ?></a></span>
                    </div>

                    <div class="joms-hcard__actions">
                        <a href="<?php echo CRoute::_('index.php?option=com_community&view=events&task=viewevent&eventid='.$event->id) ?>" class="joms-button--neutral joms-button--small">
                            <?php
                                echo JText::_('MOD_COMMUNITY_EVENTSSUGGESTIONS_JOIN_EVENT');
                            ?>
                        </a>
                    </div>

                </div>
                <!--<div class="joms-gap"></div>-->
                <!--<a href="javascript:void(0);" class="joms-text--skip">Skip to other events</a>-->
            </div>
        <?php }
    } else {
        ?>
        <div class="joms-blankslate"><?php echo JText::_('MOD_COMMUNITY_EVENTSSUGGESTIONS_NO_EVENTS') ?></div>
    <?php } ?>

<?php }else{ ?>

    <!-- If not logged in -->
    <div class="joms-blankslate">
        <?php echo JText::_('MOD_COMMUNITY_EVENTSSUGGESTIONS_GUEST'); ?>
    </div>

<?php } ?>
