<?php
/**
* @copyright (C) 2013 iJoomla, Inc. - All rights reserved.
* @license GNU General Public License, version 2 (http://www.gnu.org/licenses/gpl-2.0.html)
* @author iJoomla.com <webmaster@ijoomla.com>
* @url https://www.jomsocial.com/license-agreement
* The PHP code portions are distributed under the GPL license. If not otherwise stated, all images, manuals, cascading style sheets, and included JavaScript *are NOT GPL, and are released under the IJOOMLA Proprietary Use License v1.0
* More info at https://www.jomsocial.com/license-agreement
*/

defined('_JEXEC') or die('Restricted access');

class plgSystemJomSocial extends JPlugin
{
	function __construct($subject, $params )
	{
		parent::__construct( $subject, $params );
	}
	
	public function onAfterRender()
	{
		$body       = JResponse::getBody();
		$pattern	= '/(<body.*?\>)/is';
        $jinput = JFactory::getApplication()->input;
		
		$session	= JFactory::getSession();
		$token		= $session->getFormToken(false);;
		
		$tmpl		= $jinput->getWord( 'tmpl' );
		$noHTML		= $jinput->getInt( 'no_html' );
		$format		= $jinput->getWord( 'format' , 'html' );

		if( $format == 'html' && $noHTML != 1 && $tmpl != 'component' )
		{
			$body		= preg_replace( $pattern , '$0' . '<script type="text/javascript">jax_token_var = "' . $token .'";</script>' , $body );
			JResponse::setBody( $body );
		}
	}
}
