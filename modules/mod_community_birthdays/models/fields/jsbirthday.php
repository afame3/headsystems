<?php
// Check to ensure this file is included in Joomla!
    defined('_JEXEC') or die('Restricted access');

    jimport('joomla.form.formfield');
    jimport('joomla.form.helper');
    JFormHelper::loadFieldClass('list');

    class JFormFieldJsbirthday extends JFormFieldList
    {

        protected $type = 'jsbirthday';

        // getLabel() left out

        public function getInput()
        {
            // Check if JomSocial core file exists
            $corefile 	= JPATH_ROOT . '/components/com_community/libraries/core.php';

            jimport( 'joomla.filesystem.file' );
            if( !JFile::exists( $corefile ) )
            {
                return;
            }
            require_once( $corefile );
            /* Create the Application */
            $app = JFactory::getApplication('site');

            jimport( 'joomla.application.module.helper' );

            $model = CFactory::getModel('groups');
            //$groups = $model->getAllGroups(null, null, null, null, false,false, false);
            $db = JFactory::getDbo();
            $query = "SELECT * FROM ".$db->quoteName('#__community_fields')
                ." WHERE ".$db->quoteName('type')."=".$db->quote('birthdate');
            $db->setQuery($query);
            $birthdayFields = $db->loadObjectList();
            $value = '';

            if(!count($birthdayFields)){
                return;
            }

            foreach($birthdayFields as $field){
                $selected = ( !empty($field->value) && in_array($field->id, $this->value)) ? 'selected': '' ;
                $value .= '<option '.$selected.' value="'.$field->id.'" >'.$field->fieldcode.'</option>';
            }

            return '<select id="' . $this->id . '" name="' . $this->name . '">' .
            $value.
            '</select>';
        }
    }