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

class CommunityViewVideos extends CommunityView
{
    public function __construct()
    {         
		$this->my		= CFactory::getUser();
		$this->model	= CFactory::getModel( 'videos' );
    }
    
    public function display($tpl = null)
    {   
//         header('Content-type: application/json');
        $jsonObj    = new StdClass;           
        
        $jsonObj->allVideos = $this->_getAllVideos();
        
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
    
    private function _getAllVideos()
    {
        $mainframe= JFactory::getApplication();  
        
        $filters	= array
        (
            'status'		=> 'ready',
            'permissions'	=> 0,
            'or_group_privacy'	=> 0,
            'sorting'		=> 'latest',
            'limit'             => $mainframe->get('feed_limit')
        );
		
        $rows       = $this->model->getVideos($filters);
        $items      = array();
        
        foreach( $rows as $row){
            
            $item   = new stdClass();
            
            $table  = JTable::getInstance( 'Video', 'CTable' );
            $table->bind($row);
            
            $author = CFactory::getUser($row->creator);
            
            $item->id           = $row->id;
            $item->title        = $row->title;
            $tiem->provider     = $row->type;
            $item->videoid      = $row->video_id;
            $item->description  = $row->description;
            $item->creator      = CStringHelper::escape($author->getDisplayname());
            $item->duration     = $row->duration;
            $item->thumbnail    = $table->getThumbnail($row->id);
            $item->originallink = $row->path;
            
            $items[]              = $item;
        }
        
        return $items;
    }
    
}