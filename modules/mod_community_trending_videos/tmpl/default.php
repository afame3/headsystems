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

$svgPath = CFactory::getPath('template://assets/icon/joms-icon.svg');
include_once $svgPath;
?>
<div class="joms-module joms-module--topvideo joms-js--video-module">

    <?php if(!empty($videos)) { ?>
        <?php foreach( $videos as $video ) { ?>
        <div class="joms-module--video__item">
            <div class="joms-stream__header no-gap">
                <div class="joms-avatar--video square">
                    <a
                        <?php if ( $isVideoModal ) { ?>
                            href="javascript:" onclick="joms.api.videoOpen('<?php echo $video->id; ?>');"
                        <?php } else { ?>
                            href="<?php echo $video->getURL(); ?>"
                        <?php } ?>
                        >
                        <img src="<?php echo $video->getThumbNail(); ?>" alt="<?php echo $video->getTitle(); ?>"   title="<?php echo CStringHelper::escape($video->title); ?>" />
                        <span class="joms-video__duration"><small><?php echo $video->getDurationInHMS(); ?></small></span>
                    </a>
                </div>
                <div class="joms-popover__content">
                    <span class="joms-block joms-text--light">
                        <?php echo JText::_('COM_COMMUNITY_VIDEOS_UPLOADED_BY'); ?>
                        <a href="<?php echo CUrlHelper::userLink($video->creator); ?>">
                            <?php echo CFactory::getUser($video->creator)->getDisplayName(); ?>
                        </a>
                    </span>

                    <small>
                        <ul class="joms-list joms-text--light joms-list--inline">
                        <li>
                            <svg class="joms-icon" viewBox="0 0 14 20">
                                <use xlink:href="<?php echo CRoute::getURI(); ?>#joms-icon-thumbs-up"/>
                            </svg>

                            <span>
                                <?php echo $video->likes; ?>
                            </span>
                        </li>
                        <li>
                            <svg class="joms-icon" viewBox="0 0 14 20">
                                <use xlink:href="<?php echo CRoute::getURI(); ?>#joms-icon-eye"/>
                            </svg>

                            <span>
                                 <?php echo $video->getHits(); ?>
                            </span>
                        </li>
                        <li >
                            <svg class="joms-icon" viewBox="0 0 14 20">
                                <use xlink:href="<?php echo CRoute::getURI(); ?>#joms-icon-bubble"/>
                            </svg>

                            <span>
                                 <?php echo $video->comments; ?>
                            </span>
                        </li>
                    </ul>
                    </small>
                </div>
            </div>
        </div>
        <?php } ?>
    <?php } else { ?>
    <div class="joms-blankslate"><?php echo JText::_('MOD_COMMUNITY_TRENDING_VIDEOS_NO_VIDEOS'); ?></div>
    <?php } ?>
</div>

<script>
    (function( w ) {
        w.joms_queue || (w.joms_queue = []);
        w.joms_queue.push(function( $ ) {
            var $ct = $('#latest-videos-nav'),
                $loading = $ct.find('.joms-js--loading');

            function render( json ) {
                $list = $('.joms-js--video-module').find('.joms-list--half');
                $list.html( json.html || '&nbsp;' );
            }

            $ct.on( 'click', '.newest-videos', function( e ) {
                $loading.show();
                joms.ajax({
                    func: 'frontpage,ajaxGetNewestVideos',
                    data: [ frontpageVideos ],
                    callback: function( json ) {
                        $( e.target ).addClass('active-state').siblings('a').removeClass('active-state');
                        $loading.hide();
                        render( json );
                    }
                });
            });

            $ct.on( 'click', '.featured-videos', function( e ) {
                $loading.show();
                joms.ajax({
                    func: 'frontpage,ajaxGetFeaturedVideos',
                    data: [ frontpageVideos ],
                    callback: function( json ) {
                        $( e.target ).addClass('active-state').siblings('a').removeClass('active-state');
                        $loading.hide();
                        render( json );
                    }
                });
            });

            $ct.on( 'click', '.popular-videos', function( e ) {
                $loading.show();
                joms.ajax({
                    func: 'frontpage,ajaxGetPopularVideos',
                    data: [ frontpageVideos ],
                    callback: function( json ) {
                        $( e.target ).addClass('active-state').siblings('a').removeClass('active-state');
                        $loading.hide();
                        render( json );
                    }
                });
            });
        });
    })( window );
</script>
