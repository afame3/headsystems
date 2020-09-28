<?php

/**
 * @package		JomSocial
 * @copyright	(C) 2008 by iJoomla, Inc. - All rights reserved!
 * @license		GNU/GPL, see LICENSE.php
 */

require_once('simpletest/web_tester.php');
require_once('simpletest/autorun.php');

class WebTest extends WebTestCase{
	
	//Provide the site URL here
	public $url	=	'http://192.168.1.122/jomsocial/';

	/**
	 * Function : testEcho
	 * Description : What we are testing?
	 */
	public function testEcho(){
		echo '<b>Testing on ' . $this->url . '</b> <br /><br />';
	}

	/**
	 * Function : testHeader
	 * Description : Header test
	 */
	public function testHeader(){
		$this->get($this->url);
		
		echo 'Showing header : <br />';
		$this->showHeaders();
		echo 'Testing header... Success! <br /><br />';
	}

	/**
	 * Function : testHomepage
	 * Description : Homepage test
	 */
	public function testHomepage(){
		$result	=	$this->get($this->url);
		
		if($this->assertTrue($result)){
			echo 'Testing homepage... Success! <br /><br />';
		}else{
			echo 'Testing homepage... Failed! <br /><br />';
		}

//		$this->assertText('Get Connected!');
//		$this->assertText('Members Login');
//		$this->assertText('Username');
//		$this->assertField('username');
//		$this->assertText('Password');
//		$this->assertField('passwd');
//
//		//Members
//		$this->assertText('Members');
//		$this->assertLink('Newest');
//		$this->assertLink('Featured Members');
//		$this->assertLink('Active');
//		$this->assertLink('Popular');
//
//		//Videos
//		$this->assertText('Videos');
//		$this->assertLink('Newest');
//		$this->assertLink('Featured Videos');
//		$this->assertLink('Popular');
//		$this->assertLink('View all videos');
//
//		//Recent activities
//		$this->assertText('Recent activities');
//
//		//Search
//		$this->assertText('Search');
//		$this->assertFieldById('keyword');
//		$this->assertText('Try our');
//		$this->assertLink('Advanced Search');
//
//		//New photos
//		$this->assertText('New photos');
//		$this->assertLink('View all photos');
//
//		//Who's Online
//		$this->assertText("Who's Online");
	}

	/**
	 * Function : testAuthentication
	 * Description : Authentication test
	 */
	public function testAuthentication(){
		$this->get($this->url);

        $this->setField('username', 'admin');
        $this->setField('passwd', 'password');
        $this->click('Login');
        $this->assertLink('Logout');

		$this->restart();

        $this->get($this->url . 'index.php?option=com_community&view=profile&task=edit&Itemid=1');
//		echo $this->url . 'index.php?option=com_community&view=profile&task=edit&Itemid=1';
        $this->assertText('Please register to view this section.');
	}

	/**
	 * Function : testNavigationMenu
	 * Description : Navigation menu test
	 */
	public function testNavigationMenu(){
		$this->get($this->url);

		$this->setField('username', 'admin');
        $this->setField('passwd', 'password');
        $this->click('Login');
        $this->assertLink('Logout');

        $this->setField('username', 'admin');
        $this->setField('passwd', 'password');
        $this->click('Login');
        $this->assertLink('Logout');

		//Menu Home
		$this->click('Home');
		$this->assertText('Recent activities');
		$this->assertLink('Show all');
		$this->assertLink('Me & Friends');
		$this->back();

		//Menu Profile
		$this->click('Profile');
		$this->assertText('About Me');
		$this->back();

		//Menu		Profile
		//Submenu	Change profile picture
		$this->click('Change profile picture');
		$this->assertText('Upload a new avatar. Large image will be automatically resized.');
		$this->back();

		//Menu		Profile
		//Submenu	Edit profile
		$this->click('Edit profile');
		$this->assertText('Basic Information');
		$this->back();

		//Menu		Profile
		//Submenu	Edit details
		$this->click('Edit details');
		$this->assertText('Your details');
		$this->back();

		//Menu		Profile
		//Submenu	Privacy
		$this->click('Privacy');
		$this->assertText('Edit your privacy settings');
		$this->back();

		//Menu		Profile
		//Submenu	Preference
		$this->click('Preferences');
		$this->assertText('Number of activities to be displayed in profile');
		$this->back();

		//Menu Friends
		$this->click('Friends');
		$this->assertText('My Friends');
		$this->back();

		//Menu		Friends
		//Submenu	Show all
		$this->click('Show all');
		$this->assertText('My Friends');
		$this->assertText('Show:');
		$this->back();

		//Menu		Friends
		//Submenu	Search
		$this->click('Search');
		$this->assertFieldByName('q');
		$this->assertSubmit('Search');
		$this->back();

		//Menu		Friends
		//Submenu	Search
		$this->click('Advanced Search');
		$this->assertText('Criteria');
		$this->back();

		//Menu		Friends
		//Submenu	Invite Friends
		$this->click('Invite Friends');
		$this->assertText('You can invite your friends to this community. Just add their emails here and we will send the invite for you.');
		$this->back();

		//Menu		Friends
		//Submenu	Search
		$this->click('Request sent');
		$this->assertText('Connection request sent: Waiting for authorization');
		$this->back();

		//Menu		Friends
		//Submenu	Pending my approval
		$this->click('Pending my approval');
		$this->assertText('Waiting for your authorization');
		$this->back();

		//Menu	Applications
		$this->click('Applications');
		$this->assertText('My Applications');
		$this->back();

		//Menu		Applications
		//Submenu	My Applications
		$this->click('My Applications');
		$this->assertText('My Applications');
		$this->assertLink('Add applications');
		$this->back();

		//Menu		Applications
		//Submenu	Browse
		$this->click('Browse');
		$this->assertText('Browse');
		$this->back();

		//Menu		Applications
		//Submenu	Groups
		$this->click('Groups');
		$this->assertText('My Groups');
		$this->back();

		//Menu		Applications
		//Submenu	Photos
		$this->click('Photos');
		$this->assertText('My Photos');
		$this->back();

		//Menu		Applications
		//Submenu	Videos
		$this->click('Videos');
		$this->assertText('Videos');
		$this->back();

		//Menu Inbox
		$this->click('Inbox');
		$this->assertText('My Messages');
		$this->back();

		//Menu		Inbox
		//Submenu	Inbox
		$this->click('Inbox');
		$this->assertText('My Messages');
		$this->back();

		//Menu		Inbox
		//Submenu	Sent
		$this->click('Sent');
		$this->assertText('Sent Messages');
		$this->back();

		//Menu		Inbox
		//Submenu	Write
		$this->click('Write');
		$this->assertText('Compose');
		$this->back();
	}

	/**
	 * Function : testProfilePage
	 * Description : Profile page test
	 */
	public function testProfilePage(){
		$this->get($this->url);

		$this->setField('username', 'admin');
        $this->setField('passwd', 'password');
        $this->click('Login');
        $this->assertLink('Logout');

		$this->click('Profile');
		$this->assertText('About Me');
		$this->assertText('Basic Information');
		$this->assertText('Contact Information');
		$this->assertText('Education');

		$this->assertText('Friends');

		$this->assertText('Karma');
		$this->assertText('Member since');
		$this->assertText('Last online');
		$this->assertText('Profile views');
		$this->assertText('My Status');

		$this->assertLink('Edit profile');
		$this->assertLink('Change profile picture');
		$this->assertLink('Privacy');
		$this->assertLink('Add Video');
		$this->assertLink('Add applications');
		$this->assertLink('Start a new group');
		$this->assertLink('Invite Friends');
		$this->assertLink('Write Message');
		$this->assertLink('View your inbox');
		$this->assertLink('Upload photos');
	}

	/**
	 * Function : testStatusTextarea
	 * Description : Status text(at profile page) test
	 */
	public function testStatusTextarea(){
		$this->get($this->url);

		$this->setField('username', 'admin');
        $this->setField('passwd', 'password');
        $this->click('Login');
        $this->assertLink('Logout');

		$this->click('Profile');
		$this->setFieldById('statustext', 'TESTING STATUS');
		$this->clickSubmitById('save-status');

		$this->click('Profile');
		$this->assertText('profile-status-message', 'TESTING STATUS');
	}

	/**
	 * Function : testEditProfile
	 * Description : Edit user profile test
	 */
	public function testEditProfile(){
		$this->get($this->url);

		$this->setField('username', 'admin');
        $this->setField('passwd', 'password');
        $this->click('Login');
        $this->assertLink('Logout');

		$this->click('Edit profile');

		//Insert all the compulsory fields
		$this->setFieldById('field2', 'Male');
		$this->setFieldById('field4', 'About Me Test');
		$this->setFieldById('field8', 'Address Test');
		$this->setFieldById('field9', 'State Test');
		$this->setFieldById('field10', 'City/Town Test');
		$this->setFieldById('field11', 'Malaysia');
		$this->setFieldById('field12', 'http://www.test.com/');
		$this->setFieldById('field14', 'Test University');
		$this->setFieldById('field15', '2010');
		$this->clickSubmit('Save');

		echo 'Show outgoing request : <br />';
		//Dump the outgoing request
		$this->showRequest();
	}

	/**
	 * Function : testEventPage
	 * Description : test the event page
	 */
	public function testEventPage(){
		$this->get($this->url);

		$this->setField('username', 'admin');
        $this->setField('passwd', 'password');
        $this->click('Login');
        $this->assertLink('Logout');

		$this->click('Events');

		// The first page is 'My Events'
		$this->assertText('My Events');

		// Make sure the menu exists
		$this->assertLink('All Events');
		$this->assertLink('My Events');
		$this->assertLink('Past Events');
		$this->assertLink('Search');

		$this->assertLink('Create');
	}


	/**
	 * Function : testCreateEvent
	 * Description : test create event
	 */
	public function testCreateEvent(){
		$this->get($this->url);

		$this->setField('username', 'admin');
        $this->setField('passwd', 'password');
        $this->click('Login');
        $this->assertLink('Logout');

		$this->click('Events');

		// The first page is 'My Events'
		$this->assertText('My Events');

		// Make sure the menu exists
		$this->assertLink('All Events');
		$this->assertLink('My Events');
		$this->assertLink('Past Events');
		$this->assertLink('Search');

		$this->assertLink('Create');

		$this->click('Create');

		$this->setFieldById('title', 'Testing Event');
		$this->setFieldById('description', 'Testing event description.');
		$this->setFieldById('catid', '1');
		$this->setFieldById('location', 'Kuala Lumpur, Malaysia');

		$this->clickSubmit('Create Event');
	}


	public function testMyEvents(){
		$this->get($this->url);

		$this->setField('username', 'admin');
        $this->setField('passwd', 'password');
        $this->click('Login');
        $this->assertLink('Logout');

		$this->click('Events');

		// The first page is 'My Events'
		$this->assertText('My Events');

		// Make sure the menu exists
		$this->assertLink('All Events');
		$this->assertLink('My Events');
		$this->assertLink('Past Events');
		$this->assertLink('Search');

		$this->assertLink('Create');

		$this->assertText('Sort by:');

	}
}

?>
