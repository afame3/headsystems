<?php
    if ($authurl) {
?>
        <button type="button" class="joms-button--signup sign-with-twitter" onclick="location.href='<?php echo $authurl;?>'">
            <span><i class="fa fa-twitter" aria-hidden="true"></i></span>
            <?php echo JText::_('COM_COMMUNITY_SIGN_IN_WITH_TWITTER'); ?>
        </button>
<?php
    } else {
        echo JText::_('COM_COMMUNITY_TWITTER_FAILED_REQUEST_TOKEN');
    }
?>