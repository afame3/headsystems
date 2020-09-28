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

<div class="joms-module">
<!-- DO NOT USE ANY LOGIC HERE. THIS FILE IS ONLY FOR LAYOUT
<?php //if($user->isOnline()):?>
	<!-- If logged in -->
<?php //else:?>
	<!-- If not logged in -->
<?php //endif;?>

<div class="joms-module--trendinghashtag">
    <?php if(count($hashtags) > 0 ) { ?>

    <ul class="joms-list joms-list--inline">
        <?php foreach($hashtags as $tag=>$total){ ?>
        <li><a href="<?php echo CRoute::_('index.php?option=com_community&view=frontpage&filter=hashtag&value='.$tag); ?>"><?php echo '#'.$tag; ?></a><span><small><?php echo $total; ?></small></span></li>
        <?php } ?>
    </ul>

    <?php } else { ?>
		<p class="joms-blankslate">
			<?php echo JText::_('MOD_COMMUNITY_TRENDING_HASHTAGS_EMPTY'); ?>
		</p>
  	<?php } ?>
</div>

</div>
