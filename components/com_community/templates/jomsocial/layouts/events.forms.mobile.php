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
<style type="text/css">
div#community-wrap .calendar{
	vertical-align: middle;
	padding-left: 4px;
	padding-right:4px;
	border: medium none;
}
</style>
<?php
$startDateObj = CTimeHelper::getDate($event->startdate);
$startDate = $startDateObj->format('%Y-%m-%d');
$startMin  = $startDateObj->format('%M');
$endDateObj = CTimeHelper::getDate($event->enddate);
$endDate = $endDateObj->format('%Y-%m-%d');
$endMin  = $endDateObj->format('%M');
$hourSelect = array();
if($config->get('eventshowampm'))
{
	for($i = 1; $i <= 12; $i++)
	{
		$hourSelect[] = JHTML::_('select.option',  $i, "$i" );
	}

	$startHour = intval($startDateObj->format('%I'));
	$endHour = intval($endDateObj->format('%I'));

	// Cannot user ->format('%p') since it is dependent on current locale
	// and would return a null if the system is configured for 24H
	$startAmPm = $startDateObj->format('%H') >= 12 ? 'PM' : 'AM';
	$endAmPm   = $endDateObj->format('%H') >= 12 ? 'PM' : 'AM';
	$ampmSelect = array();
	$ampmSelect[] = JHTML::_('select.option',  'AM', "am" );
	$ampmSelect[] = JHTML::_('select.option',  'PM', "pm" );
	$startAmPmSelect = JHTML::_('select.genericlist',  $ampmSelect, 'starttime-ampm', array('class'=>'required inputbox'), 'value', 'text', $startAmPm, false );
	$endAmPmSelect	 = JHTML::_('select.genericlist',  $ampmSelect, 'endtime-ampm', array('class'=>'required inputbox'), 'value', 'text', $endAmPm, false );
}
else
{
	for($i = 0; $i <= 23; $i++)
	{
		$hourSelect[] = JHTML::_('select.option',  $i, sprintf( "%02d" ,$i) );
	}

	$startHour 	= intval($startDateObj->format('%H'));
	$endHour 	= intval($endDateObj->format('%H'));


	$startAmPmSelect = "";
	$endAmPmSelect	 = "";
}
$startTimeHourSelect	= JHTML::_('select.genericlist',  $hourSelect, 'starttime-hour', array('class'=>'required inputbox'), 'value', 'text', $startHour, false );
$endTimeHourSelect		= JHTML::_('select.genericlist',  $hourSelect, 'endtime-hour', array('class'=>'required inputbox'), 'value', 'text', $endHour, false );
$minSelect = array();
$minSelect[] = JHTML::_('select.option',  0, "00" );
$minSelect[] = JHTML::_('select.option',  15, "15" );
$minSelect[] = JHTML::_('select.option',  30, "30" );
$minSelect[] = JHTML::_('select.option',  45, "45" );
$startTimeMinSelect	= JHTML::_('select.genericlist',  $minSelect, 'starttime-min', array('class'=>'required inputbox'), 'value', 'text', $startMin, false );
$endTimeMinSelect	= JHTML::_('select.genericlist',  $minSelect, 'endtime-min', array('class'=>'required inputbox'), 'value', 'text', $endMin, false );
?>
<form method="post" action="<?php echo CRoute::getURI(); ?>" id="createEvent" name="createEvent" class="community-form-validate">
<script type="text/javascript">
function saveContent()
{
	<?php echo $editor->save( 'description' ); ?>
	return true;
}
</script>
<div id="community-events-wrap">
<?php if(!$event->id && $eventcreatelimit != 0 ) { ?>
	<div class="hints">
		<?php echo JText::sprintf('COM_COMMUNITY_EVENTS_CREATION_LIMIT_STATUS', $eventCreated, $eventcreatelimit );?>
	</div>
<?php } ?>
	<table class="formtable" cellspacing="1" cellpadding="0">
	<!-- events name -->
	<tr>
		<td class="key">
			<label for="title" class="label title jomTips" title="<?php echo JText::_('COM_COMMUNITY_EVENTS_TITLE_LABEL');?>::<?php echo JText::_('COM_COMMUNITY_EVENTS_TITLE_TIPS'); ?>">
				*<?php echo JText::_('COM_COMMUNITY_EVENTS_TITLE_LABEL'); ?>
			</label>
		</td>
		<td class="value">
			<input name="title" id="title" type="text" size="45" maxlength="255" class="required input text" value="<?php echo $this->escape($event->title); ?>" />
		</td>
	</tr>
	<!-- events description -->
	<tr>
		<td class="key">
			<label for="description" class="label title jomTips" title="<?php echo JText::_('COM_COMMUNITY_EVENTS_DESCRIPTION');?>::<?php echo JText::_('COM_COMMUNITY_EVENTS_DESCRIPTION_TIPS');?>">
				<?php echo JText::_('COM_COMMUNITY_EVENTS_DESCRIPTION');?>
			</label>
		</td>
		<td class="value">

			<?php if( $config->get( 'htmleditor' ) == 'none' && $config->getBool('allowhtml') ) { ?>
   				<div class="htmlTag"><?php echo JText::_('COM_COMMUNITY_HTML_TAGS_ALLOWED');?></div>
			<?php } ?>

			<?php
			if( !CStringHelper::isHTML($event->description)
				&& $config->get('htmleditor') != 'none'
				&& $config->getBool('allowhtml') )
			{
				$event->description = CStringHelper::nl2br($event->description);
			}

			?>
			<?php echo $editor->display( 'description',  $event->description , '95%', '350', '10', '20' , false ); ?>

		</td>
	</tr>
	<!-- events category -->
	<tr>
		<td class="key">
			<label for="catid" class="label title jomTips" title="<?php echo JText::_('COM_COMMUNITY_EVENTS_CATEGORY');?>::<?php echo JText::_('COM_COMMUNITY_EVENTS_CATEGORY_TIPS');?>">
				*<?php echo JText::_('COM_COMMUNITY_EVENTS_CATEGORY');?>
			</label>
		</td>
		<td class="value">
			<select name="catid" id="catid" class="required input select">
			<?php
			foreach( $categories as $category )
			{
				$selected	= ( $event->catid == $category->id ) ? ' selected="selected"' : '';
			?>
				<option value="<?php echo $category->id; ?>"<?php echo $selected;?>><?php echo JText::_( $this->escape($category->name) ); ?></option>
			<?php
			}
			?>
			</select>
		</td>
	</tr>

	<!-- events location -->
	<tr>
		<td class="key">
			<label for="location" class="label title jomTips" title="<?php echo JText::_('COM_COMMUNITY_EVENTS_LOCATION');?>::<?php echo JText::_('COM_COMMUNITY_EVENTS_LOCATION_TIPS'); ?>">
				*<?php echo JText::_('COM_COMMUNITY_EVENTS_LOCATION'); ?>
			</label>
		</td>
		<td class="value">
			<input name="location" id="location" type="text" size="45" maxlength="255" class="required input text" value="<?php echo $this->escape($event->location); ?>" />
		</td>
	</tr>

	<!-- events start datetime -->
	<tr>
		<td class="key">
			<label class="label title jomTips" title="<?php echo JText::_('COM_COMMUNITY_EVENTS_START_TIME');?>::<?php echo JText::_('COM_COMMUNITY_EVENTS_START_TIME_TIPS'); ?>">
				*<?php echo JText::_('COM_COMMUNITY_EVENTS_START_TIME'); ?>
			</label>
			<label for="startdate"></label>
		</td>
		<td class="value">
			<span>
				<input type="text" name="startdate" id="startdate" style="width:auto;cursor: pointer;" size="10" class="required input-medium" readonly/>
				<script>
					joms.jQuery("#startdate" ).datepicker
						({
							minDate: 0,
							changeMonth: true,
							changeYear: true,
							dateFormat: 'yy-mm-dd',
							onClose: function ( selectedDate ) {
								var startDate = new Date(selectedDate);
								var endDate = new Date(joms.jQuery('#enddate').datepicker('getDate'));
                                                                /* set minDate as startDate */
                                                                joms.jQuery('#enddate').datepicker('option','minDate',selectedDate);
								if ( startDate > endDate ) {
									joms.jQuery('#enddate').datepicker('setDate',selectedDate); /* reset endDate same as startDate */
								}
							}
						}).datepicker('setDate', "<?php echo $event->startdate;?>"); /* init date when edit event */
				</script>
				<?php echo $startTimeHourSelect; ?>:<?php  echo $startTimeMinSelect; ?> <?php echo $startAmPmSelect;?>
			</span>
		</td>
	</tr>
	<!-- events end datetime -->
	<tr>
		<td class="key">
			<label class="label title jomTips" title="<?php echo JText::_('COM_COMMUNITY_EVENTS_END_TIME');?>::<?php echo JText::_('COM_COMMUNITY_EVENTS_END_TIME_TIPS'); ?>">
				*<?php echo JText::_('COM_COMMUNITY_EVENTS_END_TIME'); ?>
			</label>
			<label for="enddate"></label>
		</td>
		<td class="value">
			<span>
				<input type="text" name="enddate" id="enddate" style="width:auto;cursor: pointer;" size="10" class="required input-medium" readonly/>
				<script>
					joms.jQuery("#enddate" ).datepicker
						({
							minDate: 0,
							changeMonth: true,
							changeYear: true,
							dateFormat: 'yy-mm-dd',
						}).datepicker('option','minDate',joms.jQuery('#startdate').datepicker('getDate')) /* set min date */
						.datepicker('setDate', "<?php echo $event->enddate;?>"); /* init date when edit event */
				</script>
				<?php echo $endTimeHourSelect; ?>:<?php echo $endTimeMinSelect; ?> <?php echo $endAmPmSelect;?>
			</span>
		</td>
	</tr>
	<?php
	if( $helper->hasPrivacy() )
	{
	?>
	<!-- events type -->
	<tr>
		<td class="key">
			<label class="label title jomTips" title="<?php echo JText::_('COM_COMMUNITY_EVENTS_TYPE');?>::<?php echo JText::_('COM_COMMUNITY_EVENTS_TYPE_TIPS');?>">
				<?php echo JText::_('COM_COMMUNITY_EVENTS_TYPE'); ?>
			</label>
		</td>
		<td class="value">
			<div>
				<input type="radio" name="permission" id="permission-open" value="0"<?php echo ($event->permission == COMMUNITY_PUBLIC_EVENT ) ? ' checked="checked"' : '';?> />
				<label for="permission-open" class="label lblradio"><?php echo JText::_('COM_COMMUNITY_EVENTS_OPEN_EVENT');?></label>
			</div>
			<div class="small">
				<?php echo JText::_('COM_COMMUNITY_EVENTS_OPEN_EVENT_DESCRIPTION');?>
			</div>

			<div>
				<input type="radio" name="permission" id="permission-private" value="1"<?php echo ($event->permission == COMMUNITY_PRIVATE_EVENT ) ? ' checked="checked"' : '';?> />
				<label for="permission-private" class="label lblradio"><?php echo JText::_('COM_COMMUNITY_EVENTS_PRIVATE_EVENT');?></label>
			</div>
			<div class="small">
				<?php echo JText::_('COM_COMMUNITY_EVENTS_PRIVATE_EVENT_DESCRIPTION');?>
			</div>
		</td>
	</tr>
	<?php
	}
	?>
	<!-- events tickets -->
	<tr>
		<td class="key">
			<label for="ticket" class="label title jomTips" title="<?php echo JText::_('COM_COMMUNITY_EVENTS_NO_SEAT');?>::<?php echo JText::_('COM_COMMUNITY_EVENTS_NO_SEAT_DESCRIPTION'); ?>">
				<?php echo JText::_('COM_COMMUNITY_EVENTS_NO_SEAT'); ?>
			</label>
		</td>
		<td class="value">
			<input name="ticket" id="ticket" type="text" size="10" maxlength="5" class="inputbox" value="<?php echo (empty($event->ticket)) ? '0' : $this->escape($event->ticket); ?>" />
			<div class="small">
				<?php echo JText::_('COM_COMMUNITY_EVENTS_NO_SEAT_DESCRIPTION');?>
			</div>
		</td>
	</tr>
	<?php
	if( $helper->hasInvitation() )
	{
	?>
	<!-- events allow guest to invite -->
	<tr>
		<td class="key">
			<label class="label title jomTips" title="<?php echo JText::_('COM_COMMUNITY_EVENTS_GUEST_INVITE');?>::<?php echo JText::_('COM_COMMUNITY_EVENTS_GUEST_INVITE_TIPS'); ?>">
				*<?php echo JText::_('COM_COMMUNITY_EVENTS_GUEST_INVITE'); ?>
			</label>
		</td>
		<td class="value">
			<!-- <?php echo JHTML::_('select.booleanlist', 'allowinvite', 'class="inputbox"', $event->allowinvite ); ?> -->
			<div>
				<input type="radio" name="allowinvite" id="allowinvite0" value="1"<?php echo ($event->allowinvite ) ? ' checked="checked"' : '';?> />
				<label for="allowinvite0" class="label lblradio"><?php echo JText::_('COM_COMMUNITY_YES');?></label>
			</div>
			<div class="small">
				<?php echo JText::_('COM_COMMUNITY_EVENTS_ALLOW_INVITE');?>
			</div>

			<div>
				<input type="radio" name="allowinvite" id="allowinvite1" value="0"<?php echo (!$event->allowinvite ) ? ' checked="checked"' : '';?> />
				<label for="allowinvite1" class="label lblradio"><?php echo JText::_('COM_COMMUNITY_NO');?></label>
			</div>
			<div class="small">
				<?php echo JText::_('COM_COMMUNITY_EVENTS_DISALLOW_INVITE');?>
			</div>

		</td>
	</tr>
	<?php
	}
	?>
	<tr>
			<td class="key"></td>
			<td class="value"><span class="hints"><?php echo JText::_( 'COM_COMMUNITY_REGISTER_REQUIRED_FIELDS' ); ?></span></td>
		</tr>

	<!-- event buttons -->
	<tr>
		<td class="key"></td>
		<td class="value">
			<?php echo JHTML::_( 'form.token' ); ?>
			<?php if(!$event->id): ?>
			<input name="action" type="hidden" value="save" />
			<?php endif;?>
			<input type="hidden" name="eventid" value="<?php echo $event->id;?>" />
			<input type="submit" value="<?php echo ($event->id) ? JText::_('COM_COMMUNITY_SAVE_BUTTON') : JText::_('COM_COMMUNITY_EVENTS_CREATE_BUTTON');?>" class="button validateSubmit" />
			<input type="button" class="button" onclick="history.go(-1);return false;" value="<?php echo JText::_('COM_COMMUNITY_CANCEL_BUTTON');?>" />
		</td>
	</tr>
	</table>
</div>
</form>
<script type="text/javascript">
	cvalidate.init();
	cvalidate.setSystemText('REM','<?php echo addslashes(JText::_("COM_COMMUNITY_ENTRY_MISSING")); ?>');
	cvalidate.noticeTitle	= '<?php echo addslashes(JText::_('COM_COMMUNITY_NOTICE') );?>';

	/*
		The calendar.js does not display properly under IE when a page has been
		scrolled down. This behaviour is present everywhere within the Joomla site.
		We are injecting our fixes into their code by adding the following
		at the end of the fixPosition() function:
		if (joms.jQuery(el).parents('#community-wrap').length>0)
		{
			var anchor   = joms.jQuery(el);
			var calendar = joms.jQuery(self.element);
			box.x = anchor.offset().left - calendar.outerWidth() + anchor.outerWidth();
			box.y = anchor.offset().top - calendar.outerHeight();
		}
		Unobfuscated version of "JOOMLA/media/system/js/calendar.js" was taken from
		http://www.dynarch.com/static/jscalendar-1.0/calendar.js for reference.
	*/
	joms.jQuery(document).ready(function()
	{
		Calendar.prototype.showAtElement=function(c,d){var a=this;var e=Calendar.getAbsolutePos(c);if(!d||typeof d!="string"){this.showAt(e.x,e.y+c.offsetHeight);return true}function b(j){if(j.x<0){j.x=0}if(j.y<0){j.y=0}var l=document.createElement("div");var i=l.style;i.position="absolute";i.right=i.bottom=i.width=i.height="0px";document.body.appendChild(l);var h=Calendar.getAbsolutePos(l);document.body.removeChild(l);if(Calendar.is_ie){h.y+=document.body.scrollTop;h.x+=document.body.scrollLeft}else{h.y+=window.scrollY;h.x+=window.scrollX}var g=j.x+j.width-h.x;if(g>0){j.x-=g}g=j.y+j.height-h.y;if(g>0){j.y-=g}if(joms.jQuery(c).parents("#community-wrap").length>0){var f=joms.jQuery(c);var k=joms.jQuery(a.element);j.x=f.offset().left-k.outerWidth()+f.outerWidth();j.y=f.offset().top-k.outerHeight()}}this.element.style.display="block";Calendar.continuation_for_khtml_browser=function(){var f=a.element.offsetWidth;var i=a.element.offsetHeight;a.element.style.display="none";var g=d.substr(0,1);var j="l";if(d.length>1){j=d.substr(1,1)}switch(g){case"T":e.y-=i;break;case"B":e.y+=c.offsetHeight;break;case"C":e.y+=(c.offsetHeight-i)/2;break;case"t":e.y+=c.offsetHeight-i;break;case"b":break}switch(j){case"L":e.x-=f;break;case"R":e.x+=c.offsetWidth;break;case"C":e.x+=(c.offsetWidth-f)/2;break;case"l":e.x+=c.offsetWidth-f;break;case"r":break}e.width=f;e.height=i+40;a.monthsCombo.style.display="none";b(e);a.showAt(e.x,e.y)};if(Calendar.is_khtml){setTimeout("Calendar.continuation_for_khtml_browser()",10)}else{Calendar.continuation_for_khtml_browser()}};
	});
</script>
