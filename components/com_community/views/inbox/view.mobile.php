<?php
/**
* @copyright (C) 2013 iJoomla, Inc. - All rights reserved.
* @license GNU General Public License, version 2 (http://www.gnu.org/licenses/gpl-2.0.html)
* @author iJoomla.com <webmaster@ijoomla.com>
* @url https://www.jomsocial.com/license-agreement
* The PHP code portions are distributed under the GPL license. If not otherwise stated, all images, manuals, cascading style sheets, and included JavaScript *are NOT GPL, and are released under the IJOOMLA Proprietary Use License v1.0
* More info at https://www.jomsocial.com/license-agreement
*/
// Check to ensure this file is included in Joomla!
defined('_JEXEC') or die();

jimport( 'joomla.application.component.view');
jimport( 'joomla.utilities.arrayhelper');

require_once(JPATH_ROOT .'/components/com_community/views/inbox/view.html.php' );

class CommunityViewMobileInbox extends CommunityViewInbox
{

	function _addSubmenu(){}
	function showSubmenu($display=true){}
	
	function inbox($data)
	{
		$document = JFactory::getDocument();
		$document->addStylesheet( JURI::root() . 'components/com_community/templates/default/css/style.mobile.css' );	
	
		parent::inbox($data);
	}		
	/**
	 * Show the message reading window
	 */	 		
	function read($data)
	{
		$mainframe	= JFactory::getApplication();
		$jinput 	= $mainframe->input;
		
		if(!$this->accessAllowed('registered'))
		{
			return;
		}

        //page title
		$document = JFactory::getDocument();
		
		$this->showSubMenu();		
		
		$inboxModel = CFactory::getModel('inbox');
		$my			= CFactory::getUser();
		$msgid		= $jinput->request->get('msgid', 0, 'INT');
		
		if(!$inboxModel->canRead($my->id, $msgid))
		{
			$mainframe = JFactory::getApplication();
			$mainframe->enqueueMessage(JText::_('COM_COMMUNITY_PERMISSION_DENIED_WARNING'), 'error');
			return;
		}

        $pathway 	= $mainframe->getPathway();

		$pathway->addItem( JText::_('COM_COMMUNITY_INBOX_TITLE'), CRoute::_('index.php?option=com_community&view=inbox') );
		 

		if(! empty($data->messages))
		{
			$document = JFactory::getDocument();

			$html = '';
			
			$parentData = $data->messages[0];
			$pathway->addItem( $parentData->subject );
			$document->setTitle( $parentData->subject );
			
			//$content = '<strong>'.$parentData->subject.'</strong>';
			//$tableData[] = array('&nbsp;', 	$content, '');
			require_once( COMMUNITY_COM_PATH.'/libraries/apps.php' );			
			$appsLib	= CAppPlugins::getInstance();
			$appsLib->loadApplications();
				
			foreach ($data->messages as $row){ 
				//$content    = '<p>'.$row->body.'</p>';
				
				// onMessageDisplay Event trigger
				$args = array();
				$args[]	= $row;
				$appsLib->triggerEvent( 'onMessageDisplay' , $args );
				$user	= CFactory::getUser($row->from);

				//construct the delete link
		        $deleteLink = CRoute::_('index.php?option=com_community&view=inbox&task=remove&msgid='.$row->id);
				$authorLink	= CRoute::_('index.php?option=com_community&view=profile&userid=' . $user->id );
				
				$my			= CFactory::getUser();
				
				$tmpl = new CTemplate();
				$tmpl->set( 'user',  $user );
				$tmpl->set( 'msg', $row );
				$tmpl->set( 'isMine' 	, COwnerHelper::isMine($my->id, $user->id));
				$tmpl->set( 'removeLink', $deleteLink);
				$tmpl->set( 'authorLink'	, $authorLink );
				$html .= $tmpl->fetch( 'inbox.message' );
			}
			
			$defaultReply = JText::_('COM_COMMUNITY_INBOX_DEFAULT_REPLY');
			$messageMissing = Jtext::_('COM_COMMUNITY_INBOX_MESSAGE_MISSING');
			$js =<<<SHOWJS
			    function cAddReply() {
			        if(joms.jQuery('textarea.replybox').val() == '$defaultReply' || joms.jQuery('textarea.replybox').val() == '') {
			            alert('$messageMissing');
			            return;
					}
				    var html='<div class=\'ajax-wait\'>&nbsp;</div>';
				    joms.jQuery('#community-wrap table tbody').append(html);				    
					jax.call('community', 'inbox,ajaxAddReply', $parentData->id, joms.jQuery('textarea.replybox').val());
					joms.jQuery('textarea.replybox').css('disabled', true);
				}
				
				function cReplyFocus(){
					if(joms.jQuery('textarea.replybox').val() == '$defaultReply')
						joms.jQuery('textarea.replybox').val(''); 
				}
				
				function cReplyBlur(){
					if(joms.jQuery('textarea.replybox').val() == '')
						joms.jQuery('textarea.replybox').val('$defaultReply');
				}
			
				function cAppendReply(html){
					joms.jQuery('div.ajax-wait').remove();
					joms.jQuery('textarea.replybox').val('');				
					joms.jQuery('#community-wrap div#inbox-messages').append(html);
				}
				
				window.scrollTo(0, 1);
				
				joms.jQuery(document).ready( function() {
					html = joms.jQuery('#back-toolbar').html();
					joms.jQuery('#back-toolbar-container').html( html ).addClass( 'black-button' );
					joms.jQuery('#back-toolbar').hide();
				});				
SHOWJS;

			$document->addScriptDeclaration($js);
			
			//echo $cms->table->generate($tableData);
			echo '<div id="inbox-messages">';
			echo '<div class="black-button" id="back-toolbar">';
			echo '<a class="btn-blue btn-prev" href="'.CRoute::_('index.php?option=com_community&view=inbox').'">';
			echo '<span>' . JText::_('COM_COMMUNITY_INBOX_BACK_TO_INBOX') , '</span>';
			echo '</a>';
			echo '<div class="clear"></div>';
			echo '</div>';		
			echo $html; 
			echo '</div>';
			
			$replyForm  = '<a name="latest"></a><form name="jsform-inbox-read" action="" method="post" class="inbox-reply-form"><div class="inbox-reply"><textarea id="replybox" onfocus="cReplyFocus()" onblur="cReplyBlur()" class="replybox">'.$defaultReply.'</textarea></div>';
			$replyForm .= '<div><input type="hidden" name="action" value="doSubmit"/>';
			$replyForm .= '<button class="ajax-wait button" onclick="cAddReply();return false;">'.JText::_('COM_COMMUNITY_ADD_REPLY_BUTTON').'</button>';
			$replyForm .= '</div></form>';
			
			echo $replyForm;
					
		} else {
		    ?>		
			
				<div class="text"><?php echo JText::_('COM_COMMUNITY_INBOX_MESSAGE_EMPTY'); ?></div>
			
			<?php		
		}//end if		
			   
	
	}//end messages	
}
