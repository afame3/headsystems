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

class CommunityViewSearch extends CommunityView
{
    public function __construct()
    {         
		$this->my		= CFactory::getUser();
		$this->model	= CFactory::getModel( 'search' );
    }
    
    public function browse()
    {   
//         header('Content-type: application/json');
        $jsonObj    = new StdClass;           
        
        $jsonObj->allPeople = $this->_getAllpeople();
        
//         echo '<pre>';
//         print_r($jsonObj);
//         echo '</pre>';
//         exit;
//         $obj=json_decode( json_encode( $jsonObj ) );
//         print_r( $obj->{'allAlbums'} ); 
        
        // Output the JSON data.
        echo json_encode( $jsonObj );
        exit;   

    }
    
    private function _getAllPeople()
    {
        $mainframe= JFactory::getApplication();     
		
		$people  = $this->model->getPeople(); 
		
        return $people;
    }
    
}