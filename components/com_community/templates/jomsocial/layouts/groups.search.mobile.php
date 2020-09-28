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
?>
<div id="community-groups-wrap">
	<!--SEARCH FORM-->
	<div class="group-search-form">
	<form name="jsform-groups-search" method="post" action="">
		<?php if(!empty($beforeFormDisplay)){ ?>
			<table class="formtable" cellspacing="1" cellpadding="0" style="width: 98%;">
				<?php echo $beforeFormDisplay; ?>
			</table>
		<?php } ?>

		<input type="text" class="inputbox" name="search" value="" size="50" />
		<?php if(!empty($afterFormDisplay)){ ?>
			<table class="formtable" cellspacing="1" cellpadding="0" style="width: 98%;">
				<?php echo $afterFormDisplay; ?>
			</table>
		<?php } ?>
		<input type="submit" value="<?php echo JText::_('COM_COMMUNITY_SEARCH_BUTTON');?>" class="button" />
		<?php echo JHTML::_( 'form.token' ); ?>
	</form>
	</div>
	<!--SEARCH FORM-->
	<?php
	if( $posted )
	{
	?>
		<!--SEARCH DETAIL-->
		<div class="group-search-detail">
			<span class="search-detail-left">
				<?php echo JText::sprintf( 'COM_COMMUNITY_SEARCH_RESULT' , $search ); ?>
			</span>
			<span class="search-detail-right">
				<?php echo JText::sprintf( (CStringHelper::isPlural($groupsCount)) ? 'COM_COMMUNITY_SEARCH_RESULT_TOTAL_MANY' : 'COM_COMMUNITY_SEARCH_RESULT_TOTAL' , $groupsCount ); ?>
			</span>
			<div style="clear:both;"></div>
		</div>
		<!--SEARCH DETAIL-->
		<?php echo $groupsHTML; ?>
	<?php
	}
	?>
</div>