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

require_once( JPATH_ROOT . '/components/com_community/libraries/core.php');

if (!class_exists('modcommunitymembersmapHelper')) {

    class modcommunitymembersmapHelper {

        var $_user = null;
        var $name = "Members Map";
        var $_name = 'modmembersmap';

        public static function prepareUpdate(&$update, &$table) {
            $lang = JFactory::getLanguage();
            $extension = 'com_community';
            $base_dir = JPATH_ADMINISTRATOR;
            $language_tag = '';
            $lang->load($extension, $base_dir, $language_tag, true);

            JFactory::getApplication()->enqueueMessage(JText::sprintf('COM_COMMUNITY_PACKAGE_DOWNLOAD_UPDATE', 'https://member.joomlart.com/'), "JomSocial Module Update");

            JFactory::getApplication()->redirect(CRoute::_("index.php?option=com_installer&view=update", false));
        }

        public function __construct($params) {
            $this->params = $params;
        }

        private function _getLocationFieldId($town_field_code, $state_field_code, $country_field_code, $address_field_code, $zip_field_code) {
            $db = JFactory::getDBO();
            $sql = "SELECT
							" . $db->quoteName("fieldcode") . ",
							" . $db->quoteName("id") . "
					FROM
							" . $db->quoteName("#__community_fields") . "
					WHERE
							" . $db->quoteName("id") . " IN (" . $db->Quote($town_field_code) . ", " . $db->Quote($state_field_code) . ", " . $db->Quote($address_field_code) . ", " . $db->Quote($zip_field_code) . ", " . $db->Quote($country_field_code) . ")";

            $db->setQuery($sql);
            $row = $db->loadObjectList();

            return $row;
        }

        private function getUsers($userid, $limit, $friendsOnly) {
            $db = JFactory::getDBO();

            if ($friendsOnly) {
                $query = 'SELECT ' . $db->quoteName('connect_to') . ' AS ids '
                        . 'FROM ' . $db->quoteName('#__community_connection') . ' '
                        . 'WHERE ' . $db->quoteName('connect_from') . '=' . $db->Quote($userid) . ' '
                        . 'AND ' . $db->quoteName('status') . '=' . $db->Quote(1) . ' ';

                // check if need to hide admins 
                $config = CFactory::getConfig();
                if (!$config->get('privacy_show_admins')) {
                    $userModel = CFactory::getModel('User');
                    $tmpAdmins = $userModel->getSuperAdmins();

                    $admins = array();

                    $query .= ' AND ' . $db->quoteName('connect_to') . ' NOT IN (';
                    for ($i = 0; $i < count($tmpAdmins); $i++) {
                        $admin = $tmpAdmins[$i];
                        $query .= $db->Quote($admin->id);
                        $query .= $i < count($tmpAdmins) - 1 ? ',' : '';
                    }
                    $query .= ')';
                }

                $query .= ' ORDER BY ids DESC';
            } else {
                $query = 'SELECT ' . $db->quoteName('id')
                        . 'FROM ' . $db->quoteName('#__users') . ' '
                        . 'WHERE ' . $db->quoteName('block') . '=' . $db->Quote(0);
            }

            if ($limit != 0) {
                $query .=" LIMIT " . $limit;
            }

            $db->setQuery($query);

            $members = $db->loadColumn();

            $result = array();
            $my = CFactory::getUser();
            $model = CFactory::getModel('Friends');
            $userFriends = $model->getFriendIds($userid);

            foreach ($members as $friendId) {
                $user = CFactory::getUser($friendId);
                $params = $user->getParams();
                $privacy = $params->get('privacyProfileView');

                if ($my->id == $userid) {
                    $result[] = $friendId;
                }

                if ($privacy == 0) {
                    $result[] = $friendId;
                } else if ($privacy == 20 && $my->id != 0) {
                    $result[] = $friendId;
                } else if ($privacy == 30 && in_array($my->id, $userFriends)) {
                    $result[] = $friendId;
                }
            }

            return array_unique($result);
        }

        /**
         *
         */
        private function getMembersLocation($members, $town_field_id, $state_field_id, $country_field_id, $zip_field_id, $address_field_id, $show_karma, $friendsOnly, $userid, $limit) {
            require_once( JPATH_ROOT . '/components/com_community/libraries/core.php');

            $db = JFactory::getDBO();
            $members_id = implode(',', $members);

            $sql = 'SELECT 	a.' . $db->quoteName('user_id') . ',
				      		a.' . $db->quoteName('value') . ' AS country,
				      		b.' . $db->quoteName('value') . ' AS state,
							c.' . $db->quoteName('value') . '	AS town,
							d.' . $db->quoteName('value') . '	AS address,
							e.' . $db->quoteName('value') . '	AS zip'
                    . ' FROM ' . $db->quoteName('#__community_fields_values') . ' AS a'
                    . ' LEFT JOIN ' . $db->quoteName('#__community_fields_values') . ' AS b'
                    . ' ON a.' . $db->quoteName('user_id') . '=b.' . $db->quoteName('user_id') . ' AND b.' . $db->quoteName('field_id') . ' = ' . $db->Quote($state_field_id)
                    . ' LEFT JOIN ' . $db->quoteName('#__community_fields_values') . ' AS c'
                    . ' ON a.' . $db->quoteName('user_id') . '=c.' . $db->quoteName('user_id') . ' AND c.' . $db->quoteName('field_id') . ' = ' . $db->Quote($town_field_id)
                    . ' LEFT JOIN ' . $db->quoteName('#__community_fields_values') . ' AS d'
                    . ' ON a.' . $db->quoteName('user_id') . '=d.' . $db->quoteName('user_id') . ' AND d.' . $db->quoteName('field_id') . ' = ' . $db->Quote($address_field_id)
                    . ' LEFT JOIN ' . $db->quoteName('#__community_fields_values') . ' AS e'
                    . ' ON a.' . $db->quoteName('user_id') . '=e.' . $db->quoteName('user_id') . ' AND e.' . $db->quoteName('field_id') . ' = ' . $db->Quote($zip_field_id);

            $sql .= ' INNER JOIN ' . $db->quoteName('#__users') . ' AS user '
                    . 'ON (a.' . $db->quoteName('user_id') . '= user.' . $db->quoteName('id') . ' AND user.' . $db->quoteName('block') . '=' . $db->Quote(0) . ')';

            // check if only using google location field as full address
            if ($country_field_id > 0)
                $sql .= ' WHERE a.' . $db->quoteName('field_id') . ' = ' . $db->Quote($country_field_id);
            else
                $sql .= ' WHERE a.' . $db->quoteName('field_id') . ' = ' . $db->Quote($address_field_id);

            if ($friendsOnly) {
                $sql .= ' AND	a.' . $db->quoteName('user_id') . ' IN (' . $members_id . ')';
            } else {
                // check if need to hide admins 
                $config = CFactory::getConfig();
                if (!$config->get('privacy_show_admins')) {
                    $userModel = CFactory::getModel('User');
                    $tmpAdmins = $userModel->getSuperAdmins();

                    $admins = array();

                    $sql .= ' AND a.' . $db->quoteName('user_id') . ' NOT IN (';
                    for ($i = 0; $i < count($tmpAdmins); $i++) {
                        $admin = $tmpAdmins[$i];
                        $sql .= $db->Quote($admin->id);
                        $sql .= $i < count($tmpAdmins) - 1 ? ',' : '';
                    }
                    $sql .= ')';
                }
            }

            $sql .= ' ORDER BY user.' . $db->quoteName('registerDate') . ' DESC';

            $sql .=" LIMIT " . $limit;

            $db->setQuery($sql);
            $row = $db->loadObjectList();

            // preload all users
            $CFactoryMethod = get_class_methods('CFactory');
            if (in_array('loadUsers', $CFactoryMethod)) {
                $uids = array();
                foreach ($row as $m) {
                    $uids[] = $m->user_id;
                }
                CFactory::loadUsers($uids);
            }

            $locations = array();
            foreach ($row as $data) {
                $user = CFactory::getUser($data->user_id);
                $address = trim($data->address);
                $town = trim(JText::_($data->town));
                $zip = trim($data->zip);
                $state = trim(JText::_($data->state));
                $country = trim(JText::_($data->country));

                $fullAddress = array();
                if (!empty($address) && $address_field_id)
                    $fullAddress[] = $address;
                if (!empty($town) && $town_field_id)
                    $fullAddress[] = $town;
                if (!empty($zip) && $zip_field_id)
                    $fullAddress[] = $zip;
                if (!empty($state) && $state_field_id)
                    $fullAddress[] = $state;
                if (!empty($country) && $country_field_id)
                    $fullAddress[] = $country;
                $getFullAddress = implode(", ", $fullAddress);

                // check if only using google location field as full address
                $locationJson = json_decode($address);
                $location = new stdClass();
                if (json_last_error() === 0 && isset($locationJson->name) && isset($locationJson->desc)) {
                    // OSM address format, remove country code at the end of address
                    $fullAddress = preg_replace('/\,[a-zA-Z]{2}$/', '', $locationJson->desc);
                    $location->json_result = $locationJson;
                } else {
                    $fullAddress = preg_replace("/(^,\s*)|(,$\s*)/", "", preg_replace("/{.+}/", "", $getFullAddress));
                }


                $location->address = $fullAddress;
                $location->{$data->user_id} = new stdClass();
                $location->{$data->user_id}->username = $user->getDisplayName();
                $location->{$data->user_id}->avatar = $user->getThumbAvatar();
                $location->{$data->user_id}->link = CRoute::_('index.php?option=com_community&view=profile&userid=' . $data->user_id);

                switch ($show_karma) {
                    case 1:
                        $location->{$data->user_id}->karma_points = "<div><img src='" . CUserPoints::getPointsImage($user) . "' alt=''/></div>";
                        break;
                    case 2:
                        $location->{$data->user_id}->karma_points = "<div><small>" . JText::_('MOD_TOPMEMBERS_POINTS') . ": " . $user->_points . "</small></div>";
                        break;
                    default :
                        $location->{$data->user_id}->karma_points = "<div></div>";
                }

                $locations[] = $location;
            }

            return $locations;
        }

        /**
         *
         */
        public function getLocationMap() {
            $lang = JFactory::getLanguage();
            $lang->load('com_community.country');

            $config = CFactory::getConfig();

            // Attach CSS
            $document = JFactory::getDocument();
            $user = CFactory::getUser();
            $userid = $user->id;
            $def_limit = $this->params->get('limit', 0);
            $mapkey = $this->params->get('mapkey', '');
            $width = $this->params->get('width', '480');  // @todo: remove
            $height = $this->params->get('height', '340');

            $show_karma = 0;
            if ($config->get('enablekarma')) {
                $show_karma = $this->params->get('show_karma', '1');
            }

            $mouse_scroll_zoom = $this->params->get('mouse_scroll_zoom', '1');
            $continuous_zoom = $this->params->get('continuous_zoom', '1');

            $address_field_id = $this->params->get("address_field_code");
            $zip_field_id = $this->params->get("zip_field_code");
            $town_field_id = $this->params->get("town_field_code");
            $state_field_id = $this->params->get("state_field_code");
            $country_field_id = $this->params->get("country_field_code");

            if ($this->params->get('display') == 1 && !CFactory::getUser()->id) {
                $content = "<div class='joms-blankslate'>" . JText::_("MOD_COMMUNITY_MEMBERSMAP_LOGIN_TO_SHOW_FRIENDS") . "</div>";
            } elseif (!empty($town_field_id) || !empty($state_field_id) || !empty($country_field_id) || !empty($zip_field_id) || !empty($address_field_id)) {

                $mainframe = JFactory::getApplication();
                $caching = $this->params->get('cache', 1);
                if ($caching) {
                    $caching = $mainframe->getCfg('caching');
                }

                $cache = JFactory::getCache('modCommunityMembersMaps');
                $cache->setCaching($caching);
                $content = $this->getMembersLocations($mapkey, $width, $height, $show_karma, $town_field_id, $state_field_id, $country_field_id, $zip_field_id, $address_field_id, $userid, $def_limit, $this->params->get('display', 0));
            } else {
                if ($this->params->get('display') == 1 && CFactory::getUser()->id) {
                    $content = "<div class='joms-blankslate'>" . JText::_("MOD_COMMUNITY_MEMBERSMAP_NO_FRIENDS_TO_SHOW") . "</div>";
                } else {
                    $content = "<div class='joms-blankslate'>" . JText::_("MOD_COMMUNITY_MEMBERSMAP_NO_MEMBERS_TO_SHOW") . "</div>";
                }
            }



            return $content;
        }

        function google_script($addr) {
            $script = '
			    	var geocoder = null;
			    	var map = null;
			    	var bounds = null;
			    	var baseIcon = null;
				';
            $zoom = $this->params->get("zoom", 5);

            $config = CFactory::getConfig();
            $apikey = $config->get('googleapikey');



            // Ourput the list of address
            $script.='var address = ' . $addr;
            $script .='

					function modCommunityMembersMapLoadScript() {
						var script = document.createElement("script");
						script.type = "text/javascript";
						script.src = "https://maps.googleapis.com/maps/api/js?' . ($apikey ? ('key=' . $apikey . '&') : '') . 'callback=modCommunityMembersMapLoadOMS";
						document.body.appendChild(script);
					}

					function modCommunityMembersMapLoadOMS() {
						var script = document.createElement("script");
						script.type = "text/javascript";
						script.src = "' . JURI::root(true) . '/modules/mod_community_membersmap/oms.min.js";
						document.body.appendChild(script);
						var timer = setInterval(function() {
							if (window.OverlappingMarkerSpiderfier) {
								clearInterval(timer);
								modCommunityMembersMapInitializeMap();
							}
						}, 500 );
					}

					function modCommunityMembersMapInitializeMap()
					{
						var myLatlng = new google.maps.LatLng(-34.397, 150.644);
						var myOptions = {
							mapTypeId: google.maps.MapTypeId.ROADMAP,
							maxZoom: ' . $zoom . ',
							minZoom: ' . $zoom . ',
						};
						map 	 = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
						bounds 	 = new google.maps.LatLngBounds();
						geocoder = new google.maps.Geocoder();
						retry	 = 10;
						oms      = new OverlappingMarkerSpiderfier(map, { markersWontMove: true, markersWontHide: true, keepSpiderfied: true });

						var iw = new google.maps.InfoWindow();

						oms.addListener("click", function(marker, event) {
							iw.setContent(marker.desc);
							iw.open(map, marker);
						});

						joms.jQuery(address).each(function(index) {
						    modCommunityMembersMapCodeAddress(address[index].address,address[index].userdetails,retry);
						});

						// disable minzoom/maxzoom after inisialization
						setTimeout(function() {
							map.setOptions({
								maxZoom: false,
								minZoom: false
							});
						}, 1000 );
					}

					function modCommunityMembersMapCodeAddress(address,userdetails,retry) {
					    if (retry >= 0)
						{
							geocoder.geocode( { "address": address}, function(results, status) {
							  if (status == google.maps.GeocoderStatus.OK) {

								var contentString = [
									"<div class=\'joms-avatar--stream\' style=\'position:absolute;top:0;left:0;bottom:0;width:32px\'>",
									"<img src=\'", userdetails.avatar, "\' width=\'24\' height=\'24\' alt=\'\' style=\'position:absolute;top:50%;transform:translateY(-50%)\'>",
									"</div>",
									"<div style=\'margin-left:40px;overflow:hidden\'>",
									"<a href=\'", userdetails.link, "\'><b>", userdetails.username, "</b></a><br/>",
									"<span>", address, "</span>",
									"</div>"
								].join("");

								var marker = new google.maps.Marker({
									map: map,
									position: results[0].geometry.location,
									desc: contentString
								});

								oms.addMarker(marker);

								// Extends the map bounds
								var point = new google.maps.LatLng(
									results[0].geometry.location.lat,
									results[0].geometry.location.lng
								);

								bounds.extend(results[0].geometry.location);
								map.fitBounds(bounds);
								map.panToBounds(bounds);
							  } else if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT){
									retry = retry - 1;
									setTimeout(function(){modCommunityMembersMapCodeAddress(address,userdetails,retry);
															address=null;
															userdetails=null;
															retry=null;},1000);
								}else {
								//alert("Geocode was not successful for the following reason: " + status);
							  }
							});
						}
					}

					function addAddressToMap(response){
						if (!response || response.Status.code != 200){
							//alert("Sorry, we were unable to geocode that address");
						}else{
							var total_ppl = 0;
							for (var l in address[response.name]){
								total_ppl++;
							}

							var marker_temp = total_ppl + "' . JText::_('PLG_FRIENDSLOCATION_FRIEND_STAY') . '<br />";

							for (var j in address[response.name]) {
								marker_temp += "<div style=\'float: left; width: 32px; margin-top: 4px;\'><img src=\'"+address[response.name][j]["avatar"][0]+"\' width=40 height=40 alt=\'\'></div><div style=\'margin-left: 45px; margin-top: 3px;\'><a href=\'"+address[response.name][j]["link"][0]+"\'>"+address[response.name][j]["username"][0]+"</a>"+address[response.name][j]["karma_points"][0]+"<div style=\'clear: both; height: 1px;\'>&nbsp;</div></div>";
							}

							place = response.Placemark[0];
							point = new GLatLng(place.Point.coordinates[1],
							                    place.Point.coordinates[0]);

		 					var marker = new GMarker(point);
		 					//bounds.extend(point);
		 					GEvent.addListener( marker, "click" , function(){
		 						marker.openInfoWindowHtml( "<B>' . JText::_('MOD_COMMUNITY_MEMBERSMAP') . '</B> : " + response.Placemark[0].address + "<br /><br />" + marker_temp);
							 } );

							map.addOverlay(marker);

							if(auto_zoom == "1"){
				 				//map.setZoom(map.getBoundsZoomLevel(bounds));
				 			}

				 			if(auto_center == "1"){
				 				//map.setCenter(bounds.getCenter());
				 			}
						}
					}

                    window.joms_queue || (window.joms_queue = []);
                    window.joms_queue.push(function() {
                        joms.jQuery(function() {
                            var canvas = joms.jQuery("#map_canvas");
                            var timer = setInterval(function() {
                                if ( canvas.is(":visible") ) {
                                    clearInterval( timer );
                                    modCommunityMembersMapLoadScript();
                                }
                            }, 1000);
                        });
                    });
					';

            $document = JFactory::getDocument();
            $document->addScriptDeclaration($script);
        }

        function osm_script($addr) {
            $script = '
			    	var geocoder = null;
			    	var map = null;
			    	var bounds = null;
			    	var baseIcon = null;
				';
            $zoom = $this->params->get("zoom", 5);

            $config = CFactory::getConfig();
            $apikey = $config->get('googleapikey');



            // Ourput the list of address
            $script.='var address = ' . $addr . ';';
            $script.=' var zoom = ' . $zoom . ';';
            $script .='
function modCommunityMembersMapLoadOMS() {
  
    var timer = setInterval(function () {
        //if (window.OverlappingMarkerSpiderfier) {
            clearInterval(timer);
            modCommunityMembersMapInitializeMap();
       // }
    }, 500);
}
window.joms_queue || (window.joms_queue = []);
window.joms_queue.push(function () {
    joms.jQuery(function () {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://unpkg.com/leaflet@1.3.4/dist/leaflet.js";

       // document.body.appendChild(script);
		
		script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster-src.js";

       // document.body.appendChild(script);
		
        jQuery("<link>")
                .appendTo("head")
                .attr({
                    type: "text/css",
                    rel: "stylesheet",
                            href: "https://unpkg.com/leaflet@1.3.4/dist/leaflet.css"
                });
	     jQuery("<link>")
                .appendTo("head")
                .attr({
                    type: "text/css",
                    rel: "stylesheet",
                            href: "https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.css"
                });
		 jQuery("<link>")
                .appendTo("head")
                .attr({
                    type: "text/css",
                    rel: "stylesheet",
                            href: "https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css"
                });	
				
        var canvas = joms.jQuery("#map_canvas");
        var timer = setInterval(function () {
            if (canvas.is(":visible")) {
                clearInterval(timer);
                modCommunityMembersMapLoadScript();
            }
        }, 1000);
    });
});

					
					';

            $document = JFactory::getDocument();
            $document->addScriptDeclaration($script);
			
			$document->addScript("https://unpkg.com/leaflet@1.3.4/dist/leaflet.js");
			$document->addScript("https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster-src.js");

            $document->addScript(JURI::root(true) . '/modules/mod_community_membersmap/osm.js');
            
            $document->addScript( JURI::root(true) . '/modules/mod_community_membersmap/oms.min.js');
        }

        private function getMembersLocations($mapkey, $width, $height, $show_karma, $town_field_id, $state_field_id, $country_field_id, $zip_field_id, $address_field_id, $userid, $def_limit, $friendsOnly) {
            ob_start();

            $members = $this->getUsers($userid, $def_limit, $friendsOnly);

            if ($this->params->get('hide_empty', 0) && !count($members))
                return '';

            if (!empty($members)) {
                $members_location = $this->getMembersLocation($members, $town_field_id, $state_field_id, $country_field_id, $zip_field_id, $address_field_id, $show_karma, $friendsOnly, $userid, $def_limit);


                // Convert to array of address
                $fl = array();
                $fLocation = array();
                if (!empty($members_location)) {
                    foreach ($members_location as $key => $val) {
                        $fl[] = $val;
                    }

                    // reformat $members_location
                    foreach ($fl as &$val) {

                        $obj = new stdclass();
                        foreach ($val as $key => $value) {

                            if (is_object($value)) {
                                $value->userid = $key;
                                $obj->userdetails = $value;
                            } else {
                                $obj->address = $value;
                            }
                        }

                        $fLocation[] = $obj;
                    }
                }

                $addr = json_encode($fLocation);

                if (CFactory::getConfig()->get('maps_api', '') == 'googlemap') {
                    $this->google_script($addr);
                } else {
                    $this->osm_script($addr);
                }



                $content = '<div id="map_canvas" style="width:100%; height:' . $height . 'px"></div>';
                echo $content;
            } else {
                ?>
                <div id="application-flocations">
                    <div class="joms-blankslate"><?php echo JText::_("MOD_COMMUNITY_MEMBERSMAP_NO_FRIENDS_YET") ?></div>
                </div>
                <?php
            }

            $html = ob_get_contents();
            @ob_end_clean();

            return $html;
        }

        function onAppDisplay() {
            ob_start();
            $limit = 0;
            $html = $this->onProfileDisplay($limit);
            echo $html;

            $content = ob_get_contents();
            ob_end_clean();

            return $content;
        }

    }

}
