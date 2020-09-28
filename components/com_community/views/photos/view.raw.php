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

class CommunityViewPhotos extends CommunityView
{
    public function __construct()
    {         
		$this->my		= CFactory::getUser();
		$this->model	= CFactory::getModel( 'photos' );
    }
    
    public function display()
    {   

        $jsonObj    = new StdClass;
        
        $jsonObj->allAlbums = $this->_getAllAlbums();
        
        // Output the JSON data.
        echo json_encode( $jsonObj );
        exit;   

    }
    
    private function _getAllAlbums()
    {
        $mainframe= JFactory::getApplication();
		$albums   = $this->model->getAllAlbums( 0, $mainframe->get('feed_limit'));
		$items    = array(); 

        foreach($albums as $album){
		
		    $item               = new stdClass();
		    
    		$table			    = JTable::getInstance( 'Album' , 'CTable' );
    		$table->bind($album);
    		$table->thumbnail	= $table->getCoverThumbPath();
            $albumAuthor        = CFactory::getUser($table->creator);
    		
            $item->id           = $album->id;
            $item->creator      = CStringHelper::escape($albumAuthor->getDisplayname());
            $item->name         = CStringHelper::escape($album->name);
            $item->description  = CStringHelper::escape($album->description);
            $item->created      = $album->created;
            $item->updated      = $album->lastupdated;
            $item->thumbnail    = $table->thumbnail;
            $item->photocount   = $album->count;
            
            $items[]            = $item;
            
        } 

		return $items;
    }
    
}