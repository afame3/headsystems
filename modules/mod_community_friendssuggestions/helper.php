<?php
/**
* @copyright (C) 2015 iJoomla, Inc. - All rights reserved.
* @license GNU General Public License, version 2 (http://www.gnu.org/licenses/gpl-2.0.html)
* @author iJoomla.com <webmaster@ijoomla.com>
* @url https://www.jomsocial.com/license-agreement
* The PHP code portions are distributed under the GPL license. If not otherwise stated, all images, manuals, cascading style sheets, and included JavaScript *are NOT GPL, and are released under the IJOOMLA Proprietary Use License v1.0
* More info at https://www.jomsocial.com/license-agreement
*/
defined('_JEXEC') or die('Restricted access');

require_once( JPATH_ROOT .'/components/com_community/libraries/core.php');

// All the module logic should be placed here
if(!class_exists('modcommunityfriendssuggestionsHelper'))
{
    class modcommunityfriendssuggestionsHelper
    {   
        public static function prepareUpdate(&$update, &$table)
        {   
            $lang = JFactory::getLanguage();
            $extension = 'com_community';
            $base_dir = JPATH_ADMINISTRATOR;
            $language_tag = '';
            $lang->load($extension, $base_dir, $language_tag, true);

            JFactory::getApplication()->enqueueMessage(JText::sprintf('COM_COMMUNITY_PACKAGE_DOWNLOAD_UPDATE', 'https://member.joomlart.com/'), "JomSocial Module Update");
        
            JFactory::getApplication()->redirect(CRoute::_("index.php?option=com_installer&view=update", false));
        }
        
        public function getSuggestedFriends($params)
        {
            $my = CFactory::getUser();
            $config = CFactory::getConfig();
            $db = JFactory::getDbo();
            $limit = $params->get('limit', 5);
            $inversedGender = $params->get('matchmaking_mode',1);

            if(!$my->id){
                return;
            }

			//settings
            $suggestFriendsOfFriends = $params->get('fof_suggest',1); //settings to get the friends of friends
            $suggestSameProfileType = $params->get('profile_type_suggest',0); //settings to get only the same profile type
            $matchField = array_filter(array(
                $params->get('matchfield_1',''),
                $params->get('matchfield_2',''),
                $params->get('matchfield_3',''),
                $params->get('matchfield_4',''),
                $params->get('matchfield_5','')
            ));

            $matchField = array_unique($matchField);

            $matchFieldLogic = $params->get('profile_filter', 0); // 0 = any field, 1 = must match all field

            $users = array(); // this is the users that

            if(!empty($matchField)){

                $query = "SELECT v.field_id, v.value, f.type FROM ".$db->quoteName('#__community_fields_values')
                        ." as v LEFT JOIN ".$db->quoteName('#__community_fields')." as f ON v.field_id=f.id"
                    ." WHERE ".$db->quoteName('field_id')." IN(".implode(',', $matchField).") AND "
                    .$db->quoteName('user_id')."=".$db->quote($my->id)
                    ." AND ".$db->quoteName('value')."!=".$db->quote('');

                $db->setQuery($query);
                $currentUserFields = $db->loadObjectList();

                if(empty($currentUserFields)){
                    //if the current user doesn't have any field. return as empty right away
                    return array();
                }

                $fields = array(); //all the information will be stored as $fields[field_id] = field_value;
                foreach($currentUserFields as $field){
                    //if this is a matchmaking mode, we need to inverse the gender
                    if($inversedGender && $field->type == 'gender'){
                        $gender = array(
                            'COM_COMMUNITY_MALE'=>'COM_COMMUNITY_FEMALE',
                            'male'=>'female',
                            'female'=>'male',
                            'COM_COMMUNITY_FEMALE'=>'COM_COMMUNITY_MALE',
                        );
                        $fields[$field->field_id] = $gender[$field->value];
                        continue;
                    }

                    //if this is checkbox or select, the format will be seperated by comma, so we need to query differently
                    if($field->type == 'checkbox' || $field->type == 'select'){
                        $selectedOptions = array_filter(explode(',',$field->value));
                        $fields[$field->field_id] = $selectedOptions;
                        continue;
                    }

                    $fields[$field->field_id] = $field->value;
                }

                if(empty($fields)){
                    // if field is empty, we assume all the users can be suggested to the current user except for this own friend
                    $query = "SELECT u.id FROM ".$db->quoteName('#__community_users')
                        ." as c LEFT JOIN ".$db->quoteName('#__users')." AS u ON c.userid=u.id"
                        ." WHERE u.".$db->quoteName('block')."=".$db->quote(0);
                    $db->setQuery($query);

                    $users = $db->loadColumn();
                }else{
                    $additionalQuery = '';
                    $temp = array(); //store the query in chunk
                    foreach($fields as $fieldId => $value){
                        if(is_array($value)){
                            //if this is an array, this should be a checkbox or multiple select, so we need to find using LIKE
                            foreach($value as $v){
                                $temp[] = "(".$db->quoteName('field_id')."=".$db->quote($fieldId).' AND '
                                .$db->quoteName('value').' LIKE '.$db->quote('%'.$v.',%').")";
                            }
                        }else{
                            $temp[] = "(".$db->quoteName('field_id')."=".$db->quote($fieldId).' AND '
                            .$db->quoteName('value').'='.$db->quote($value).")";
                        }
                    }

                    $additionalQuery = implode(' OR ', $temp);

                    if(!$matchFieldLogic){
                        // 0 = or
                        $query = "SELECT v.user_id FROM ".$db->quoteName('#__community_fields_values')
                                ." as v LEFT JOIN ".$db->quoteName('#__users')." AS u ON v.user_id=u.id"
                                ." WHERE u.".$db->quoteName('block')."=".$db->quote(0)
                                ." AND (".$additionalQuery.") GROUP BY v.user_id";
                    }else{
                        // 1 = and
                        $query = "SELECT user_id FROM ".$db->quoteName('#__community_fields_values')
                                ." as v LEFT JOIN ".$db->quoteName('#__users')." AS u ON v.user_id=u.id"
                                ." WHERE u.".$db->quoteName('block')."=".$db->quote(0)
                                ." AND (".$additionalQuery.") GROUP BY user_id HAVING COUNT(field_id) = ".count($matchField);
                    }

                    $db->setQuery($query);

                    $users = $db->loadColumn(); // all the matches will be stored here
                }
            }else{

                // this will basically include all the users in here
                $query = "SELECT id FROM ".$db->quoteName('#__users')." WHERE ".$db->quoteName('block')."=".$db->quote(0);
                $db->setQuery($query);

                $users = $db->loadColumn();
            }

            $sameProfileUsers = array();
            //if profile type is enabled, we must only show the users within this profile only
            if($suggestSameProfileType && $config->get('profile_multiprofile',0)){
                $myProfileId = $my->_profile_id;

                $query = "SELECT userid FROM ".$db->quoteName('#__community_users')
                    ." WHERE ".$db->quoteName('profile_id')."=".$db->quote($myProfileId);

                $db->setQuery($query);
                $sameProfileUsers = $db->loadColumn();

                $users = array_intersect($sameProfileUsers, $users); // we get the intersect results from profile field results with same profile results
            }

            $model = CFactory::getModel('Friends');
            $friends = $model->getFriends($my->id, 'latest', false, 'all', 0, '', true); // get all my friends

            //now lets see if we only suggest friends of friend
            if($suggestFriendsOfFriends){
                $friendsOfFriends = $model->getFriendsOfFriends();
                $users = array_intersect($users, $friendsOfFriends);

                foreach($users as $key=>$user){
                    if(in_array($user,$friends) || $user == $my->id){
                        unset($users[$key]);
                    }
                }
            }

            $users = array_unique($users);

            $blockModel = CFactory::getModel('block');
            $blockedUsersObj = $blockModel->getBlockedList($my->id);
            $blockedUsers = array();
            foreach($blockedUsersObj as $blockedUser){
                $blockedUsers[] = $blockedUser->blocked_userid;
            }

            foreach($users as $key=>$user){
                //filter all the friends and blocked users
                if( in_array($user, $blockedUsers) || CFriendsHelper::isWaitingApproval($my->id,$user) || CFriendsHelper::isWaitingApproval($user, $my->id) || in_array($user,$friends) || $my->id == $user){
                    unset($users[$key]);
                }
            }

            return array_slice($users,0,$limit);
		}
	}
}
