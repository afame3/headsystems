<?php
/**
* @copyright (C) 2015 iJoomla, Inc. - All rights reserved.
* @license GNU General Public License, version 2 (http://www.gnu.org/licenses/gpl-2.0.html)
* @author iJoomla.com <webmaster@ijoomla.com>
* @url https://www.jomsocial.com/license-agreement
* The PHP code portions are distributed under the GPL license. If not otherwise stated, all images, manuals, cascading style sheets, and included JavaScript *are NOT GPL, and are released under the IJOOMLA Proprietary Use License v1.0
* More info at https://www.jomsocial.com/license-agreement
*/

defined('_JEXEC') or die();

$svgPath = CFactory::getPath('template://assets/icon/joms-icon.svg');
include_once $svgPath;

?>

<?php if ( !empty( $events ) ) { ?>

<ul class="joms-list--event">
    <?php foreach ( $events as $event ) {
    $table = $event;
    ?>

        <li class="joms-stream__header no-gap">
            <div class="joms-popover__avatar">
                <div class="joms-avatar">
                    <img src="<?php echo $table->getCover(); ?>" alt="<?php echo CStringHelper::escape($event->title); ?>" >
                </div>
            </div>
            <div class="joms-popover__content">
                <h5 class="reset-gap"><a href="<?php echo $event->getLink(); ?>"><?php echo CStringHelper::escape($event->title); ?></a></h5>
                <div class="joms-gap--small"></div>
                <small>
                    <ul class="joms-list joms-list--inline joms-text--light">
                        <li>
                            <svg class="joms-icon" viewBox="0 0 14 20">
                                <use xlink:href="<?php echo CRoute::getURI(); ?>#joms-icon-users"/>
                            </svg>
                            <?php echo $event->confirmedcount; ?>
                        </li>
                        <li>
                            <svg class="joms-icon" viewBox="0 0 14 20">
                                <use xlink:href="<?php echo CRoute::getURI(); ?>#joms-icon-eye"/>
                            </svg>
                            <?php echo $event->hits; ?>
                        </li>
                        <li>
                            <svg class="joms-icon" viewBox="0 0 14 20">
                                <use xlink:href="<?php echo CRoute::getURI(); ?>#joms-icon-thumbs-up"/>
                            </svg>
                            <?php echo $event->likes; ?>
                        </li>
                        <li>
                            <svg class="joms-icon" viewBox="0 0 14 20">
                                <use xlink:href="<?php echo CRoute::getURI(); ?>#joms-icon-pencil"/>
                            </svg>
                            <?php echo $event->posts; ?>
                        </li>
                    </ul>
                </small>
            </div>
        </li>
    <?php } ?>
</ul>

<?php } else { ?>
    <div class="joms-blankslate"><?php echo JText::_('MOD_COMMUNITY_POPULAR_EVENTS_NO_EVENTS'); ?></div>
<?php } ?>
