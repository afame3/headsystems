<?php
/**
* @copyright (C) 2015 iJoomla, Inc. - All rights reserved.
* @license GNU General Public License, version 2 (http://www.gnu.org/licenses/gpl-2.0.html)
* @author iJoomla.com <webmaster@ijoomla.com>
* @url https://www.jomsocial.com/license-agreement
* The PHP code portions are distributed under the GPL license. If not otherwise stated, all images, manuals, cascading style sheets, and included JavaScript *are NOT GPL, and are released under the IJOOMLA Proprietary Use License v1.0
* More info at https://www.jomsocial.com/license-agreement
*/
defined( '_JEXEC' ) or die( 'Unauthorized Access' );

	// Check if JomSocial core file exists
	$corefile = JPATH_ROOT . '/components/com_community/libraries/core.php';

	jimport( 'joomla.filesystem.file' );
	if( !JFile::exists( $corefile ) )
	{
		return;
	}

	// Include JomSocial's Core file, helpers, settings...
	require_once( $corefile );
	require_once dirname(__FILE__) . '/helper.php';
    
    $jinput = JFactory::getApplication()->input;
    $jcookie = $jinput->cookie;
    $config = CFactory::getConfig();

    // add proper stylesheet
    JFactory::getLanguage()->isRTL() ? CTemplate::addStylesheet('style.rtl') : CTemplate::addStylesheet('style');

    // add module-specific assets
    $document = JFactory::getDocument();
    $document->addStyleSheet(JURI::root(true) . '/modules/mod_community_dating/assets/css/style.css');
    $document->addScript(JURI::root(true) . '/modules/mod_community_dating/assets/js/scripts.js');

    $datingHelper = new modcommunitydatingHelper();

    $genderField = (int) $params->get('gender_field');
    $ageField = (int) $params->get('age_field');
    $locationField = (int) $params->get('location_field');
    $radiusSearch = (int) $params->get('use_radius_search');

    $profilemodel = CFactory::getModel('profile');
    $my = CFactory::getUser();
    $data = JRequest::get('get');

    // gender html
    if ($genderField) {
        $genderFieldCls = new CFieldsGender();
        $genderFieldInfo = $profilemodel->getField($genderField);
        $genderFieldOptions = $genderFieldCls->getFieldOptions();

        // remove Select Gender for logged in user
        if ($my->id > 0) unset($genderFieldOptions['']);
        
        // gender selected value
        modcommunitydatingHelper::createDatingModuleCookie($data, $genderFieldInfo->fieldcode, 'CommunityModuleGender');
        $myGender = $my->getInfo($genderFieldInfo->fieldcode);
    }

    // age html
    if ($ageField) {
        $ageFieldInfo = $profilemodel->getField($ageField);
        $ageFieldParams = new CParameter($ageFieldInfo->params);
        $ageFieldFormat = $ageFieldParams->get('display');

        // age from default value
        modcommunitydatingHelper::createDatingModuleCookie($data, $ageFieldInfo->fieldcode, 'CommunityModuleAge');
        $ageFrom = ($jcookie->get('CommunityModuleAge', null) && $my->id > 0) ? $jcookie->get('CommunityModuleAge', null) : JText::_('MOD_COMMUNITY_DATING_AGE_FROM_VALUE');

        $ageTo = ($jcookie->get('CommunityModuleAgeTo', null) && $my->id > 0) ? $jcookie->get('CommunityModuleAgeTo', null) : JText::_('MOD_COMMUNITY_DATING_AGE_TO_VALUE');

        if ($ageFieldFormat == 'age') {
            if (strrpos($ageFrom, '-')) {
                $ageFrom = JText::_('MOD_COMMUNITY_DATING_AGE_FROM_VALUE');
            }

            if (strrpos($ageTo, '-')) {
                $ageTo = JText::_('MOD_COMMUNITY_DATING_AGE_TO_VALUE');
            }
        }
    }

    if ($locationField) {
        if ($my->id && $radiusSearch) {
            $useRadius = true;

            $measurement = ' ' . JText::_($config->get('advanced_search_units') === 'metric'
                ? 'COM_COMMUNITY_SORT_BY_DISTANCE_METRIC'
                : 'COM_COMMUNITY_SORT_BY_DISTANCE_IMPERIAL'
            );

            $radiusFieldOptions = array();
            $radiusFieldOptions[''] = JText::_('MOD_COMMUNITY_DATING_WITHIN');
            foreach (array(10, 20, 50, 100, 200, 500) as $value) {
                $radiusFieldOptions[ $value . $measurement ] = $value . $measurement;
            }

            modcommunitydatingHelper::createDatingModuleCookie($data, 'FIELD_RADIUS_SEARCH', 'CommunityModuleRadius');
        } else {
            $useRadius = false;
            $locationFieldInfo = $profilemodel->getField($locationField);
            if ($locationFieldInfo->type === 'country') {
                $locationFieldCls = new CFieldsCountry();
                $locationFieldOptions = $locationFieldCls->getCountriesList();
            }

            modcommunitydatingHelper::createDatingModuleCookie($data, $locationFieldInfo->fieldcode, 'CommunityModuleLocation');
        }
    }

    require(JModuleHelper::getLayoutPath('mod_community_dating', $params->get('layout', 'default')));
