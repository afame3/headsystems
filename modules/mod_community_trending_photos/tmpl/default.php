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

<div class="joms-module--photo">

<?php if( $photos ) {

    $isPhotoModal = $config->get('album_mode') == 1;

    ?>

    <?php for( $i = 0 ; $i < count( $photos ); $i++ ) {
        $row    =& $photos[$i];
        $row->user = CFactory::getUser($row->creator);
        $link = CRoute::_( 'index.php?option=com_community&view=profile&userid=' . $row->user->_userid);
        $photoUrl = CRoute::_('index.php?option=com_community&view=photos&task=photo&albumid=' . $row->albumid . '&photoid=' . $row->id);
        if ( $isPhotoModal ) {
            $photoUrl = 'javascript:" onclick="joms.api.photoOpen(\'' . $row->albumid . '\', \'' . $row->id . '\');';
        }
    ?>
    <div class="joms-module--photo__item">
        <div class="joms-stream__header no-gap">
          <div class="joms-avatar--stream square">
            <a href="<?php echo $photoUrl; ?>" >
                <img title="<?php echo JText::sprintf('MOD_COMMUNITY_TRENDING_PHOTOS_UPLOADED_BY' , $row->user->getDisplayName() );?>" src="<?php echo $row->getThumbURI(); ?>" alt="<?php echo CStringHelper::escape( $row->user->getDisplayName() );?>" >
            </a>
          </div>
            <div class="joms-popover__content">

                <span class="joms-block joms-text--light"><?php echo JText::_('MOD_COMMUNITY_TRENDING_PHOTOS_UPLOADED_BY') . ' <a href="'. $link .'">'. $row->user->getDisplayName() . '</a>' ?></span>
                <small>
                    <ul class="joms-list joms-text--light joms-list--inline">
                    <li>
                        <svg class="joms-icon" viewBox="0 0 14 20">
                            <use xlink:href="<?php echo CRoute::getURI(); ?>#joms-icon-thumbs-up"/>
                        </svg>
                        <!-- TOTAL OF LIKE -->
                        <span><?php echo $row->likes; ?></span>
                    </li>
                    <li>
                        <svg class="joms-icon" viewBox="0 0 14 20">
                            <use xlink:href="<?php echo CRoute::getURI(); ?>#joms-icon-eye"/>
                        </svg>
                        <!-- TOTAL OF VIEW -->
                        <span><?php echo $row->views; ?></span>
                    </li>
                    <li >
                        <svg class="joms-icon" viewBox="0 0 14 20">
                            <use xlink:href="<?php echo CRoute::getURI(); ?>#joms-icon-bubble"/>
                        </svg>
                        <!-- TOTAL OF COMMENTS -->
                        <span><?php echo $row->comments; ?></span>
                    </li>
                </ul>
                </small>
            </div>
        </div>
    </div>
    <?php } ?>


<?php } else { ?>
   <div class="joms-blankslate"><?php echo JText::_('MOD_COMMUNITY_TRENDING_PHOTOS_NO_PHOTO_UPLOADED');?></div>
<?php } ?>
</div>
