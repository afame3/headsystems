<?php
// Check to ensure this file is included in Joomla!
    defined('_JEXEC') or die('Restricted access');

    jimport('joomla.form.formfield');
    jimport('joomla.form.helper');
    JFormHelper::loadFieldClass('list');

    class JFormFieldJseventcategory extends JFormFieldList
    {

        protected $type = 'jseventcategory';

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

            $db = JFactory::getDbo();
            $query = "SELECT * FROM ".$db->quoteName('#__community_events_category');
            $db->setQuery($query);
            $categories = $db->loadObjectList();
            $value = '';

            $value .= '<option value="0" >'.JText::_('MOD_COMMUNITY_POPULAR_EVENT_ALL_EVENTS').'</option>';
            foreach($categories as $category){
                $selected = ( !empty($this->value) && $category->id == $this->value) ? 'selected': '' ;
                $value .= '<option '.$selected.' value="'.$category->id.'" >'.$category->name.'</option>';
            }

            return '<select id="' . $this->id . '" name="' . $this->name . '">' .
            $value.
            '</select>';
        }
    }