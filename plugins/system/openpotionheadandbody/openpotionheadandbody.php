<?php
######################################################################
# OPENPOTION Head and Body          	            	          	     #
# Copyright (C) 2013 by OPENPOTION  	   	    	   	   	   	   	   	 #
# Homepage   : www.openpotion.com		       	    	   	   	   	   		 #
# Author     : Jason Hull      		    	   	   	   	   	   	   	   	 #
# Email      : jason@openpotion.com   	   	   	   	   	   	   	     #
# Version    : 1.2.4                        	   	    	   	   	   	 #
# License    : http://www.gnu.org/copyleft/gpl.html GNU/GPL          #
######################################################################

// no direct access
defined('_JEXEC') or die('Restricted access');

jimport('joomla.plugin.plugin');
jimport('joomla.environment.response');

class plgSystemOpenPotionheadandbody extends JPlugin {

	function plgSystemOpenPotionheadandbody(&$subject, $config) {
		parent::__construct($subject, $config);

		if (version_compare(JVERSION, '1.6.0', 'ge')) {
			$mode = $this->params->def('mode', 1);
		}
		else {
			$this->_plugin = JPluginHelper::getPlugin('system', 'openpotionheadandbody');
			$this->_params = new JParameter($this->_plugin->params);
		}
	}

	function onAfterRender() {
		if (version_compare(JVERSION, '1.6.0', 'ge')) {
			$mainframe = JFactory::getApplication();
		}
		else {
			global $mainframe;
		}

		if (version_compare(JVERSION, '3.2.0', 'ge'))
			$headers = $mainframe->getHeaders();
		else
			$headers = JResponse::getHeaders();

		if ($headers[count($headers) - 1]['name'] == 'Content-Type') {
			if (strpos($headers[count($headers) - 1]['value'], 'text/html') === false) {
				return;
			}
		}

		$doc = JFactory::getDocument();
		if ($doc->getType() !== 'html') { // || JRequest::getCmd('tmpl') === 'component'
			return false;
		}

		if (version_compare(JVERSION, '1.6.0', 'ge')) {
			$head_code = $this->params->get('head_code');
			$body_code = $this->params->get('body_code');
			$body_start_code = $this->params->get('body_start_code');
		}
		else {
			$head_code = $this->params->get('head_code', '');
			$body_code = $this->params->get('body_code', '');
			$body_start_code = $this->params->get('body_start_code', '');
		}

		if ( ($head_code == '' && $body_code == '' && $body_start_code == '') || $mainframe->isAdmin() || strpos($_SERVER["PHP_SELF"], "index.php") === false) {
			return;
		}

		if (version_compare(JVERSION, '3.2.0', 'ge'))
			$buffer = $mainframe->getBody();
		else
			$buffer = JResponse::getBody();

		//trimming spaces
		$head_code = ltrim(rtrim($head_code));
		$body_code = ltrim(rtrim($body_code));
		$body_start_code = ltrim(rtrim($body_start_code));

		if ($head_code) {
			//$head_code = "<script type=\"text/javascript\">//OpenPotion Head and Body plugin\n$head_code\n</script>\n";
			$head_code = "\n$head_code\n";
			$pos = strrpos($buffer, "</head>");
			if ($pos) {
				$buffer = substr($buffer, 0, $pos) . $head_code . substr($buffer, $pos);
//				JResponse::setBody($buffer);
			}
		}

		if ($body_code) {
			//$body_code = "<script type=\"text/javascript\">\n$body_code\n</script>\n";
			$body_code = "\n$body_code\n";
			$pos = strrpos($buffer, "</body>");
			if ($pos) {
				$buffer = substr($buffer, 0, $pos) . $body_code . substr($buffer, $pos);
//				JResponse::setBody($buffer);
			}
		}

		if ($body_start_code) {
			//$body_start_code = "\n<script type=\"text/javascript\">\n$body_start_code\n</script>";
			$body_start_code = "\n$body_start_code\n";
			$pos = strpos($buffer, ">", strpos($buffer, "<body")) + 1;
			if ($pos) {
				$buffer = substr($buffer, 0, $pos) . $body_start_code . substr($buffer, $pos);
//				JResponse::setBody($buffer);
			}
		}

		if ( $head_code || $body_code || $body_start_code ) {
			if (version_compare(JVERSION, '3.2.0', 'ge'))
				$mainframe->setBody($buffer);
			else
				JResponse::setBody($buffer);
		}

		return true;
	}

}
