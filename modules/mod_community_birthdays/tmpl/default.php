<?php
/**
* @copyright (C) 2015 iJoomla, Inc. - All rights reserved.
* @license GNU General Public License, version 2 (http://www.gnu.org/licenses/gpl-2.0.html)
* @author iJoomla.com <webmaster@ijoomla.com>
* @url https://www.jomsocial.com/license-agreement
* The PHP code portions are distributed under the GPL license. If not otherwise stated, all images, manuals, cascading style sheets, and included JavaScript *are NOT GPL, and are released under the IJOOMLA Proprietary Use License v1.0
* More info at https://www.jomsocial.com/license-agreement
*/

defined('_JEXEC') or die();

?>

<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="498" height="144" viewBox="0 0 498 144" class="joms-hide">
        <defs>
        <g id="joms-icon-gift">
            <path d="M42.69,14.567H5.2c-2.281,0-4.137,1.856-4.137,4.137v4.885c0,2.081,1.551,3.791,3.555,4.078v15.185  c0,1.711,1.392,3.103,3.103,3.103H40.17c1.711,0,3.103-1.392,3.103-3.103V27.667c2.004-0.287,3.555-1.997,3.555-4.078v-4.885  C46.827,16.423,44.971,14.567,42.69,14.567z M3.131,23.589v-4.885c0-1.141,0.928-2.068,2.068-2.068h15.385v9.021H5.2  C4.059,25.657,3.131,24.73,3.131,23.589z M6.687,42.852V27.726h13.898v16.16H7.721C7.151,43.886,6.687,43.421,6.687,42.852z   M40.17,43.886H27.307v-16.16h13.897v15.126C41.204,43.421,40.739,43.886,40.17,43.886z M44.759,23.589  c0,1.141-0.927,2.068-2.068,2.068H27.307v-9.021H42.69c1.142,0,2.068,0.928,2.068,2.068V23.589z"/><path d="M34.736,4.459c-5.59-0.507-9.195,4.067-10.791,6.695c-1.596-2.628-5.201-7.202-10.79-6.695  c-3.076,0.275-5.409,2.193-5.312,4.366c0.074,1.667,1.792,5.542,16.102,5.542s16.028-3.875,16.104-5.542  C40.146,6.652,37.813,4.735,34.736,4.459z M9.91,8.732C9.87,7.837,11.328,6.7,13.34,6.52c0.217-0.02,0.431-0.029,0.641-0.029  c4.101,0,6.928,3.665,8.22,5.787C12.646,12.044,9.961,9.898,9.91,8.732z M25.687,12.278c1.286-2.121,4.106-5.787,8.224-5.787  c0.21,0,0.424,0.009,0.64,0.029c2.012,0.181,3.471,1.317,3.433,2.213C37.93,9.898,35.243,12.045,25.687,12.278z"/>
        </g>
        </defs>
    </svg>

<?php if($user->id){ ?>


    <ul class="joms-list--general">

        <?php
        if(count($birthday) > 0) {
            foreach ($birthday as $date =>$results) {
                $_date = explode('-', $results[0]->php_date);
                $_date[] = date('Y');
                $_date = implode('-', $_date);
                $_date = date( $dateFormat, strtotime($_date) );

                ?>
                <h5 class="joms-titlebar <?php echo ($date == date('md')) ? 'joms-text--bold' : ''; ?>">
                    <?php 
                    if ($results[0]->php_date == date('d-m')) {
                        echo JText::_('MOD_COMMUNITY_BIRTHDAYS_TODAY');  
                    } else {
                        // split all words and translate it
                        preg_match_all("/\w+/", $_date, $matches);
                        
                        if (isset($matches[0])) {
                            foreach ($matches[0] as $match) {
                                $_date = str_replace($match, JText::_($match), $_date);
                            }
                        }
                        echo $_date;
                    }
                    ?>
                </h5>
                <?php
                foreach($results as $info) {
                    $member = CFactory::getUser($info->user_id);
                    ?>
                    <li class="joms-list__item" >
                        <div
                            class="joms-list__avatar <?php CUserHelper::onlineIndicator($member); ?>">
                            <a class="joms-avatar " href="<?php echo CRoute::_('index.php?option=com_community&view=profile&userid=' . $member->id); ?>">
                                <img src="<?php echo $member->getThumbAvatar(); ?>"
                                     title="<?php echo CTooltip::cAvatarTooltip($member); ?>"
                                     alt="<?php echo CStringHelper::escape($member->getDisplayName()) ?>"
                                     data-author="<?php echo $member->id; ?>">
                            </a>
                        </div>
                        <div class="joms-list__body">
                            <h5 class="joms-text--username">
                                <a href="<?php echo CRoute::_('index.php?option=com_community&view=profile&userid=' . $member->id); ?>"><?php echo CStringHelper::escape($member->getDisplayName()); ?></a>
                            </h5>
                            <?php if($params->get('show_age')){ ?>
                            <p class="joms-text--light"><?php echo CStringHelper::isPlural($info->age+1) ? JText::sprintf('MOD_COMMUNITY_BIRTHDAYS_TURNING_YEARS',$info->age+1) : JText::sprintf('MOD_COMMUNITY_BIRTHDAYS_TURNING_YEAR',$info->age+1); ?></p>
                            <?php } ?>
                            <?php if ($results[0]->php_date == date('d-m')) { ?>
                                <a href="javascript:void();" class="joms-button--primary joms-button--smallest" onclick="joms.api.pmSend('<?php echo $member->id; ?>')">
                                    <?php echo JText::_('MOD_COMMUNITY_BIRTHDAYS_SEND_A_WISH') ?>
                                </a>
                            <?php } ?>

                        </div>
                    </li>
                    <?php
                }
            }
        }elseif($params->get('sorting') == 3 && !CFactory::getUser()->id){
            echo JText::_('MOD_COMMUNITY_BIRTHDAYS_LOGIN_TO_VIEW');
        }else{
            echo "<div class='joms-blankslate'>".JText::_('MOD_COMMUNITY_BIRTHDAYS_EMPTY')."</div>";
        }
        ?>
    </ul>

<?php }else{ ?>

    <!-- If not logged in -->
    <div class="joms-blankslate">
        <?php echo JText::_('MOD_COMMUNITY_BIRTHDAYS_GUEST'); ?>
    </div>

<?php } ?>
