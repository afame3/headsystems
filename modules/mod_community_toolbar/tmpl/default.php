<?php
/**
 * @package   Socialize Template - Community Toolbar
 * @copyright JomSocial, Copyright (C) 2015 All rights reserved.
 */

defined('_JEXEC') or die;

$viewName = JRequest::getCmd( 'view');
$taskName = JRequest::getCmd( 'task');
$uri = 'index.php?option=com_community&view=' . $config->get('redirect_login');
$uri = base64_encode($uri);
?>


<!-- Container -->
<div class="container">
<!-- Toolbar for Users -->
<?php if($my->id) : ?>

	<div class="navbar-header pull-left">
	<?php if(isset($toolbar_left_logo) && !empty($toolbar_left_logo)){?>
		<a class="navbar-brand hidden-xs" href="<?php echo $logo_url;?>"><img height="50" src="<?php echo $toolbar_left_logo;?>" alt="<?php echo $logo_url.' logo';?>"/></a>
	<?php }?>
	<?php if(isset($toolbar_small_logo) && !empty($toolbar_small_logo)){?>
		<a class="navbar-brand visible-xs" href="<?php echo $logo_url;?>"><img height="50" src="<?php echo $toolbar_small_logo;?>" alt="<?php echo $logo_url.' logo';?>"/></a>
	<?php }?>
	</div>

	<!-- Collect the nav links, forms, and other content for toggling -->
	<div class="collapse navbar-collapse">
		<ul class="nav navbar-nav">
			<li>
				<a href="<?php echo CRoute::_( 'index.php?option=com_community&view=frontpage' );?>">
					<span class="glyphicon glyphicon-home"></span>
				</a>
			</li>
			<li>
				<a rel="tooltip" data-placement="bottom" class="joms-module-global-notif" href="javascript:" onclick="joms.popup.notification.global();" title="<?php echo JText::_( 'COM_COMMUNITY_NOTIFICATIONS_GLOBAL' );?>">
					<span class="glyphicon glyphicon-globe"></span>
					<span class="joms-notifications__label joms-js--notiflabel-general"><?php if( $newNotificationCount ) { echo $newNotificationCount; } ?></span>
				</a>
			</li>
			<li>
				<a rel="tooltip" data-placement="bottom" class="joms-module-friend-invite-notif" onclick="joms.popup.notification.friend(); return false;" href="<?php echo CRoute::_( 'index.php?option=com_community&view=friends&task=pending' );?>" onclick="joms.notifications.showRequest();return false;" title="<?php echo JText::_( 'COM_COMMUNITY_NOTIFICATIONS_INVITE_FRIENDS' );?>">
					<span class="glyphicon glyphicon-user"></span>
					<span class="joms-notifications__label joms-js--notiflabel-frequest"><?php if( $newFriendInviteCount ){ echo $newFriendInviteCount; }?></span>
				</a>
			</li>
			<li>
				<a rel="tooltip" data-placement="bottom" class="joms-module-new-message-notif" onclick="joms.popup.notification.pm(); return false;" href="<?php echo CRoute::_( 'index.php?option=com_community&view=inbox' );?>"  onclick="joms.notifications.showInbox();return false;" title="<?php echo JText::_( 'COM_COMMUNITY_NOTIFICATIONS_INBOX' );?>">
					<span class="glyphicon glyphicon-envelope"></span>
					<span class="joms-notifications__label joms-js--notiflabel-inbox"><?php if( $newMessageCount ){ echo $newMessageCount;} ?></span>
				</a>
			</li>
		</ul>
		<form class="navbar-form navbar-left" role="search" name="search" id="cFormSearch" method="post" action="<?php echo CRoute::_('index.php?option=com_community&view=search&task=advancesearch');?>">
			<div class="form-group form-group--search">
				<input type="text" class="form-control" placeholder="Search" id="keyword" name="q">
			</div>
			<button type="submit" class="btn btn-default">
				<span class="glyphicon glyphicon-search"></span>
			</button>
			<input type="hidden" name="search" value="friends" />
		</form>
		<div class="navbar-right navbar-login">
			<div class="navbar-user">
				<a class="" href="<?php echo CRoute::_('index.php?option=com_community&view=profile')?>">
					<img class="img-circle" width="30" src="<?php echo $my->getAvatar(); ?>" alt="<?php echo $my->getDisplayName(); ?>" /> 
					<span><?php echo $my->getDisplayName(); ?></span>
				</a>
			</div>
			<ul class="nav navbar-nav">
				<li class="dropdown">
					<a href="<?php echo CRoute::_('index.php?option=com_community&view=profile&task=preferences'); ?>" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
						<span class="glyphicon glyphicon-cog"></span> <!--<span class="caret"></span>-->
					</a>
					<ul class="dropdown-menu" role="menu">
						<li><a href="<?php echo CRoute::_('index.php?option=com_community&view=profile&task=uploadAvatar'); ?>"><?php echo JText::_('MOD_HELLOME_CHANGE_PROFILE_PICTURE'); ?></a></li>
						<li><a href="<?php echo CRoute::_('index.php?option=com_community&view=profile&task=edit'); ?>"><?php echo JText::_('MOD_HELLOME_CHANGE_EDIT_PROFILE'); ?></a></li>
						<li><a href="<?php echo CRoute::_('index.php?option=com_community&view=profile&task=preferences'); ?>"><?php echo JText::_('MOD_HELLOME_CHANGE_EDIT_PRIVACY'); ?></a></li>
					</ul>
				</li>
				<li>
					<a class="dropdown-toggle" href="javascript:" title="<?php echo JText::_('COM_COMMUNITY_LOGOUT'); ?>" onclick="document.communitylogout3.submit();">
						<span class="glyphicon glyphicon-off"></span>
					</a>
				</li>
				<form class="cForm" action="<?php echo JRoute::_('index.php');?>" method="post" name="communitylogout3" id="communitylogout3">
					<input type="hidden" name="option" value="<?php echo COM_USER_NAME ; ?>" />
					<input type="hidden" name="task" value="<?php echo COM_USER_TAKS_LOGOUT ; ?>" />
					<input type="hidden" name="return" value="<?php echo $logoutLink; ?>" />
					<?php echo JHtml::_('form.token'); ?>
				</form>
			</ul>
		</div>
	</div><!-- /.navbar-collapse -->

	<!-- Mobile toolbar -->
	<ul class="nav nav-pills visible-xs">
		<li>
			<a href="<?php echo CRoute::_( 'index.php?option=com_community&view=frontpage' );?>">
				<span class="glyphicon glyphicon-home"></span>
			</a>
		</li>
		<li>
			<a class="joms-module-global-notif" href="javascript:" onclick="joms.popup.notification.global();">
				<span class="glyphicon glyphicon-globe"></span>
				<span class="joms-notifications__label joms-js--notiflabel-general"><?php if( $newNotificationCount ) { echo $newNotificationCount; } ?></span>
			</a>
		</li>
		<li>
			<a class="joms-module-friend-invite-notif" onclick="joms.popup.notification.friend(); return false;" href="<?php echo CRoute::_( 'index.php?option=com_community&view=friends&task=pending' );?>" onclick="joms.notifications.showRequest();return false;">
				<span class="glyphicon glyphicon-user"></span>
				<span class="joms-notifications__label joms-js--notiflabel-frequest"><?php if( $newFriendInviteCount ){ echo $newFriendInviteCount; }?></span>
			</a>
		</li>
		<li>
			<a class="joms-module-new-message-notif" onclick="joms.popup.notification.pm(); return false;" href="<?php echo CRoute::_( 'index.php?option=com_community&view=inbox' );?>"  onclick="joms.notifications.showInbox();return false;">
				<span class="glyphicon glyphicon-envelope"></span>
				<span class="joms-notifications__label joms-js--notiflabel-inbox"><?php if( $newMessageCount ){ echo $newMessageCount;} ?></span>
			</a>
		</li>
		<li>
			<a class="search-input-toggle">
				<span class="glyphicon glyphicon-search"></span>
			</a>
		</li>
		<li class="dropdown">
			<a href="<?php echo CRoute::_('index.php?option=com_community&view=profile&task=preferences'); ?>" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
				<span class="glyphicon glyphicon-cog"></span> <!--<span class="caret"></span>-->
			</a>
			<ul class="dropdown-menu" role="menu">
				<li><a href="<?php echo CRoute::_('index.php?option=com_community&view=profile&task=uploadAvatar'); ?>"><?php echo JText::_('MOD_HELLOME_CHANGE_PROFILE_PICTURE'); ?></a></li>
				<li><a href="<?php echo CRoute::_('index.php?option=com_community&view=profile&task=edit'); ?>"><?php echo JText::_('MOD_HELLOME_CHANGE_EDIT_PROFILE'); ?></a></li>
				<li><a href="<?php echo CRoute::_('index.php?option=com_community&view=profile&task=preferences'); ?>"><?php echo JText::_('MOD_HELLOME_CHANGE_EDIT_PRIVACY'); ?></a></li>
				<li class="divider visible-xs"></li>
				<li class="visible-xs"><a href="javascript:" onclick="document.communitylogout3.submit();"><?php echo JText::_('COM_COMMUNITY_LOGOUT'); ?></a></li>
			</ul>
		</li>
	</ul>
	<div class="menu-search collapse" >
		<form class="navbar-form form-inline visible-xs" role="search" name="search" id="cFormSearch-mobile" method="post" action="<?php echo CRoute::_('index.php?option=com_community&view=search&task=advancesearch');?>">

			<div class="input-append" style="width:100%;">
				<input type="text" class="input-small" placeholder="Search" id="keyword-mobile" name="q" style="display:inline-block; width:80%;">
				<button type="submit" class="btn btn-primary" style="padding:7px; width:20%;">
					<span class="glyphicon glyphicon-search"></span>
				</button>
			</div>
			<input type="hidden" name="search" value="friends" />
		</form>
	</div>
<?php else: ?>

	<div class="navbar-header pull-left">
	<?php if(isset($toolbar_left_logo) && !empty($toolbar_left_logo)){?>
		<a class="navbar-brand" href="<?php echo $logo_url;?>"><img height="50" src="<?php echo $toolbar_left_logo;?>" alt="<?php echo $logo_url.' logo';?>"/></a>
	<?php }?>
	</div>

	<!-- Login hidden on mobile -->
	<form class="navbar-form navbar-right hidden-xs" action="<?php echo CRoute::_( 'index.php?option='.COM_USER_NAME.'&task='.COM_USER_TAKS_LOGIN ); ?>" method="post" name="form-login" id="form-login-socialize">
		<div class="form-group form-group">
			<span id="form-login-username">
				<input name="username" id="username-socialize" type="text" class="form-control" placeholder="<?php echo JText::_('COM_COMMUNITY_USERNAME') ?>">
			</span>
			<a rel="tooltip" data-placement="bottom" title="<?php echo JText::_('COM_COMMUNITY_FORGOT_USERNAME') ?>" href="<?php echo CRoute::_( 'index.php?option=com_users&view=remind');?>">
				<span class="glyphicon glyphicon-question-sign"></span>
			</a>

			<span id="form-login-password">
				<input name="<?php echo COM_USER_PASSWORD_INPUT;?>" id="passwd-socialize" type="password" class="form-control" placeholder="<?php echo JText::_('COM_COMMUNITY_PASSWORD') ?>">
			</span>
			<a rel="tooltip" data-placement="bottom" title="<?php echo JText::_('COM_COMMUNITY_FORGOT_PASSWORD') ?>" href="<?php echo CRoute::_( 'index.php?option=com_users&view=reset');?>">
				<span class="glyphicon glyphicon-question-sign"></span>
			</a>

			<?php if(CSystemHelper::tfaEnabled()){?>
				<span id="form-login-password">
					<input name="secretkey" id="passwd-socialize-tfa" type="password" class="form-control" placeholder="<?php echo JText::_('COM_COMMUNITY_AUTHENTICATION_KEY') ?>">
				</span>
			<?php } ?>
		</div>

		<?php if (JPluginHelper::isEnabled('system', 'remember')) { ?>
		<label id="form-login-remember">
			<span for="remember">
				<?php echo JText::_('COM_COMMUNITY_REMEMBER_MY_DETAILS') ?>
				<input tabindex="3" class="checkbox" type="checkbox" name="remember" id="remember-socialize" value="yes" alt="Remember Me" />
			</span>
		</label>
		<?php } ?>

		<?php if($fbHtml){ // LOGIN WITH FACEBOOK ACCOUNT ?>
		<div class="fb-login-button">
			<?php echo $fbHtml; ?>
		</div>
		<?php }?>

		<button type="submit" name="Submit" class="btn btn-sm btn-primary">
			<?php echo JText::_('MOD_COMMUNITY_LOGIN') ?>
		</button>

		<?php
		$usersConfig=JComponentHelper::getParams( 'com_users' );
		if ($usersConfig->get('allowUserRegistration')) { ?>

		<a class="btn btn-sm btn-accent" href="<?php echo CRoute::_( 'index.php?option=com_community&view=register' ); ?>">
			<?php echo JText::_('MOD_COMMUNITY_SIGN_UP') ?>
		</a>
		<?php } ?>

		<input type="hidden" name="option" value="<?php echo COM_USER_NAME;?>" />
		<input type="hidden" name="task" value="<?php echo COM_USER_TAKS_LOGIN;?>" />
		<input type="hidden" name="return" value="<?php echo $uri; ?>" />
		<?php echo JHTML::_('form.token'); ?>
	</form>

	<div class="navbar-form pull-right visible-xs">
		<!-- MOBILE LOGIN BUTTON -->
		<button type="button" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#modal-login">
			<i class="fa fa-sign-in"></i>
			<?php echo JText::_('MOD_COMMUNITY_LOGIN') ?>
		</button>
		<?php
		$usersConfig=JComponentHelper::getParams( 'com_users' );
		if ($usersConfig->get('allowUserRegistration')) { ?>

		<a class="btn btn-sm btn-accent" href="<?php echo CRoute::_( 'index.php?option=com_community&view=register' ); ?>">
			<?php echo JText::_('MOD_COMMUNITY_SIGN_UP') ?>
		</a>
		<?php } ?>
	</div>

<?php endif; ?>
</div>

<button type="button" class="btn btn-sm btn-primary toggle-button toggle-no-header" data-toggle="collapse" data-target=".t3-navbar-collapse">
	<i class="fa fa-bars"></i>
</button>

<!-- Login Modal -->
<div class="modal modal-login fade" id="modal-login" tabindex="-1" role="dialog" aria-labelledby="modal-login" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title">Login</h4>
			</div>
			<div class="modal-body">
				<form action="<?php echo CRoute::_( 'index.php?option='.COM_USER_NAME.'&task='.COM_USER_TAKS_LOGIN ); ?>" method="post" name="form-login" id="form-login-socialize-mobile">
					<div class="form-group">
						<span id="form-login-username">
							<input name="username" id="username-socialize-mobile" type="text" class="form-control" placeholder="<?php echo JText::_('COM_COMMUNITY_USERNAME') ?>">
						</span>
					</div>
					
					<div class="form-group">
						<span id="form-login-password">
							<input name="<?php echo COM_USER_PASSWORD_INPUT;?>" id="passwd-socialize-mobile" type="password" class="form-control" placeholder="<?php echo JText::_('COM_COMMUNITY_PASSWORD') ?>">
						</span>
					</div>

					<ul class="list-unstyled">
						<li>
							<a href="<?php echo CRoute::_( 'index.php?option=com_users&view=remind');?>">
								<?php echo JText::_('COM_COMMUNITY_FORGOT_USERNAME') ?>
							</a>
						</li>
						<li>
							<a href="<?php echo CRoute::_( 'index.php?option=com_users&view=reset');?>">
								<?php echo JText::_('COM_COMMUNITY_FORGOT_PASSWORD') ?>
							</a>
						</li>
					</ul>

					<?php if(CSystemHelper::tfaEnabled()){?>
						<div class="form-group">
							<span id="form-login-password">
								<input name="secretkey" id="passwd-socialize-tfa-mobile" type="password" class="form-control" placeholder="<?php echo JText::_('COM_COMMUNITY_AUTHENTICATION_KEY') ?>">
							</span>
						</div>
					<?php } ?>

					<?php if (JPluginHelper::isEnabled('system', 'remember')) { ?>
					<div class="checkbox">
						<label id="form-login-remember" for="remember">
							<input tabindex="3" class="checkbox" type="checkbox" name="remember" id="remember-socialize-mobile" value="yes" alt="Remember Me" />
							<?php echo JText::_('COM_COMMUNITY_REMEMBER_MY_DETAILS') ?>
						</label>
					</div>
					<?php } ?>

					<button type="submit" name="Submit" class="btn btn-block btn-lg btn-primary">
						<?php echo JText::_('MOD_COMMUNITY_LOGIN') ?>
					</button>

					<input type="hidden" name="option" value="<?php echo COM_USER_NAME;?>" />
					<input type="hidden" name="task" value="<?php echo COM_USER_TAKS_LOGIN;?>" />
					<input type="hidden" name="return" value="<?php echo $uri; ?>" />
					<?php echo JHTML::_('form.token'); ?>
				</form>
			</div>
			<?php if($fbHtml){ // LOGIN WITH FACEBOOK ACCOUNT ?>
			<div class="modal-footer">
				<div class="fb-login-button">
					<?php echo $fbHtml; ?>
				</div>
			</div>
			<?php }?>
		</div>
	</div>
</div>

<script type="text/javascript">
	jQuery('#t3-community-toolbar').tooltip({
		selector: "a[rel=tooltip]"
	});
	jQuery('.search-input-toggle').click(function() {
		  jQuery('.menu-search').toggleClass('in');
	});
</script>
