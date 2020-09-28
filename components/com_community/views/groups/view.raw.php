<?php
/**
* @copyright (C) 2013 iJoomla, Inc. - All rights reserved.
* @license GNU General Public License, version 2 (http://www.gnu.org/licenses/gpl-2.0.html)
* @author iJoomla.com <webmaster@ijoomla.com>
* @url https://www.jomsocial.com/license-agreement
* The PHP code portions are distributed under the GPL license. If not otherwise stated, all images, manuals, cascading style sheets, and included JavaScript *are NOT GPL, and are released under the IJOOMLA Proprietary Use License v1.0
* More info at https://www.jomsocial.com/license-agreement
*/

// no direct access
defined('_JEXEC') or die('Restricted access');     

class CommunityViewGroups extends CommunityView
{
    public function display($tpl = null)
    { 
        $jsonObj    = new StdClass;
        
        $jsonObj->latestGroups             = $this->_latestGroups();
        $jsonObj->viewlatestdiscussions    = $this->_viewlatestdiscussions();
        $jsonObj->viewmylatestdiscussions  = $this->_viewmylatestdiscussions();

//         $obj=json_decode( json_encode( $jsonObj ) );
//         print_r( $obj->{'latestGroups'} );         
        // Output the JSON data.
        echo json_encode( $jsonObj );
        exit;   

    }
    
    private function _latestGroups()
    {      	
        $model      = CFactory::getModel('groups');
        $rows       = $model->getAllGroups();
        $items      = array();

        //CFactory::load( 'helpers' , 'string' );
		
		foreach($rows as $row){
        
            $group              = JTable::getInstance( 'Group' , 'CTable' );
            $group->load( $row->id );
        
            // load individual item creator class
            $item               = new stdClass();
            
            $item->id           = $row->id;
			$item->name 		= CStringHelper::escape($row->name); 
			$item->description 	= $row->description;
            $item->email        = $row->email;
            $item->website      = $row->website;
            $item->avatar       = $group->getThumbAvatar($row->id);
            $item->discusscount = $row->discusscount;
            $item->wallcount    = $row->wallcount;
            $item->membercount  = $row->membercount; 
			$item->link 		= CRoute::getExternalURL('index.php?option=com_community&view=groups&task=viewgroup&groupid='.$row->id); 
			$item->date			= $row->created;
            
            $items[]            = $item;
        }
       
        return $items;
    }
    
    private function _viewlatestdiscussions()
    {
        $jinput = JFactory::getApplication()->input;
		$categoryId   = $jinput->getInt( 'categoryid' , 0 );
                                                         	
		// getting group's latest discussion activities.
     	$model        = CFactory::getModel('groups');
		$rows         =	$model->getGroupLatestDiscussion($categoryId);
        $items        = array();

		//CFactory::load( 'helpers' , 'string' );

        foreach($rows as $row){
        
            $group              = JTable::getInstance( 'Group' , 'CTable' );
            $group->load( $row->id );
            
            // load individual item creator class
            $item               = new stdClass();
		    $user               = Cfactory::getUser($row->creator);
		    $profileLink        = CRoute::getExternalURL('index.php?option=com_community&view=profile&userid='.$row->creator);  

            $item->id           = $row->id;  
			$item->title 		= $row->title;
            $item->creator      = CStringHelper::escape($user->getDisplayName());
            $item->groupname    = CStringHelper::escape($group->name);;
            $item->lastreplied  = $row->lastreplied;
            $item->lastrepliedby= $row->lastreplied_by;
			$item->link 		= CRoute::_('index.php?option=com_community&view=groups&task=viewdiscussion&groupid='.$row->groupid.'&topicid='.$row->id);
            
            $items[]            = $item;
        }
       
        return $items; 
    } 
    
    private function _viewmylatestdiscussions()
    {
        $jinput = JFactory::getApplication()->input;
		$categoryId   = $jinput->get( 'categoryid' , 0 );
		$groupIds     = $jinput->get( 'groupids' , 0 );
                                                       	
		// getting group's latest discussion activities.
     	$model        = CFactory::getModel('groups');
		$rows         =	$model->getGroupLatestDiscussion($categoryId,$groupIds);
        $items        = array();

		//CFactory::load( 'helpers' , 'string' );

        foreach($rows as $row){ 
        
            $group              = JTable::getInstance( 'Group' , 'CTable' );
            $group->load( $row->id );
            
            // load individual item creator class
            $item               = new stdClass();
		    $user               = Cfactory::getUser($row->creator);
		    $profileLink        = CRoute::getExternalURL('index.php?option=com_community&view=profile&userid='.$row->creator);  

            $item->id           = $row->id;  
			$item->title 		= $row->title;
            $item->creator      = CStringHelper::escape($user->getDisplayName());
            $item->groupname    = CStringHelper::escape($group->name);;
            $item->lastreplied  = $row->lastreplied;
            $item->lastrepliedby= $row->lastreplied_by;
			$item->link 		= CRoute::_('index.php?option=com_community&view=groups&task=viewdiscussion&groupid='.$row->groupid.'&topicid='.$row->id);
            
            $items[]            = $item;
        }
       
        return $items;
    }
    
}