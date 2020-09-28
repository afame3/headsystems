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

$formAction = CRoute::_(JURI::base() . 'index.php', false);
$formAdditionalParams = 'operator=and&profiletype=0&option=com_community&view=search&task=advancesearch&Itemid=' . CRoute::getItemId() . '&key-list=';
?>

<div class="joms-module--dating">
    <form method="GET" action="<?php echo $formAction; ?>">
        <?php if ($genderField) { ?>
            <input type="hidden" class="joms-module--dating-gender-field" value="<?php echo $genderFieldInfo->fieldcode; ?>" />
            <div class="joms-module-select-wrapper joms-module--dating-gender">
                <label><?php echo JText::_('MOD_COMMUNITY_DATING_GENDER_LABEL') ?></label>
                <select class="joms-module-select joms-module--dating-gender-value">
                    <?php
                    $selected = '';
                    foreach ($genderFieldOptions as $key => $value) {
                        if ($my->id > 0) {
                            if ($jcookie->get('CommunityModuleGender', null)) {
                                $selected = ($key == $jcookie->get('CommunityModuleGender', null)) ? 'selected' : '';
                            } else {
                                $selected = ($key != $myGender) ? 'selected' : '';
                            }
                        }
                    ?>
                        <option value="<?php echo $key ?>" <?php echo $selected ?>><?php echo $value ?></option>
                    <?php } ?>
                </select>
            </div>
        <?php } ?>

        <?php if ($ageField) { ?>
            <label><?php echo JText::_('MOD_COMMUNITY_DATING_AGE_LABEL') ?></label>
            <input type="hidden" class="joms-module--dating-age-field" value="<?php echo $ageFieldInfo->fieldcode; ?>" />
            <div class="joms-age-inputs clearfix">
                <input type="text" class="joms-module-input joms-module--dating-age-from" value="<?php echo $ageFrom ?>"/>
                <span><?php echo JText::_('MOD_COMMUNITY_DATING_TO_LABEL') ?></span>
                <input type="text" class="joms-module-input joms-module--dating-age-to" value="<?php echo $ageTo ?>" />
            </div>
        <?php } ?>

        <?php if ($locationField) { ?>
            <?php if ($useRadius) { ?>

                <input type="hidden" class="joms-module--dating-radius-field" value="FIELD_RADIUS_SEARCH" />
                <div class="joms-module-select-wrapper">
                    <select class="joms-module-select joms-module--dating-radius-value">
                        <?php
                        $selected = '';
                        foreach ($radiusFieldOptions as $key => $value) { 
                            if ($jcookie->get('CommunityModuleRadius', null) && $my->id > 0) {
                                $selected = (str_replace(" ", "", $key) == $jcookie->get('CommunityModuleRadius', null)) ? 'selected' : '';
                            }
                        ?>
                            <option value="<?php echo $key ?>" <?php echo $selected ?>><?php echo $value ?></option>
                        <?php } ?>
                    </select>
                </div>

            <?php } else if (isset($locationFieldOptions)) { ?>

                <input type="hidden" class="joms-module--dating-location-field" value="<?php echo $locationFieldInfo->fieldcode; ?>" />
                <input type="hidden" class="joms-module--dating-location-type" value="<?php echo $locationFieldInfo->type; ?>" />
                <div class="joms-module-select-wrapper">
                    <select class="joms-module-select joms-module--dating-location-value">
                        <option value=""><?php echo JText::_('MOD_COMMUNITY_DATING_PLACES_PLACEHOLDER'); ?></option>
                        <?php
                        $selected = '';
                        foreach ($locationFieldOptions as $key => $value) {
                            if ($jcookie->get('CommunityModuleLocation', null) && $my->id > 0) {
                                $selected = ($value == $jcookie->get('CommunityModuleLocation', null)) ? 'selected' : '';
                            }
                        ?>
                            <option value="<?php echo $value ?>" <?php echo $selected ?>><?php echo $key ?></option>
                        <?php } ?>
                    </select>
                </div>

            <?php } else { ?>

                <input type="hidden" class="joms-module--dating-location-field" value="<?php echo $locationFieldInfo->fieldcode; ?>" />
                <input type="hidden" class="joms-module--dating-location-type" value="<?php echo $locationFieldInfo->type; ?>" />
                <input type="text" class="joms-module-input joms-module--dating-location-value" placeholder="<?php echo JText::_('MOD_COMMUNITY_DATING_PLACES_PLACEHOLDER'); ?>" value="<?php echo ($jcookie->get('CommunityModuleLocation', null) && $my->id > 0) ? $jcookie->get('CommunityModuleLocation', null) : '';?>" />

            <?php } ?>
        <?php } ?>

        <button type="submit" class="joms-button--primary joms-button--full">
            <?php echo JText::_('MOD_COMMUNITY_DATING_SEARCH') ?>
        </button>
    </form>
</div>
<script>
mod_community_dating_data = {
    formAction: '<?php echo $formAction ?>',
    formAdditionalParams: '<?php echo $formAdditionalParams ?>',
    ageFormat: '<?php echo $ageField && $ageFieldFormat ? $ageFieldFormat : "date" ?>',
    serverTimestamp: <?php echo round(microtime(true) * 1000) ?>
};
</script>
