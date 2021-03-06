<?php
/**
* @package ThemeXpert
* @author ThemeXpert http://www.themexpert.com
* @copyright Copyright (c) 2010 - 2016 ThemeXpert
* @license http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 or Later
* @credit: Helix Framework
*/

defined('JPATH_BASE') or die;

if($displayData['params']->get('show_vote')) {

$rating = (int) $displayData['item']->rating;
$layout = JRequest::getCmd('view', 'article');

$rating_count = $displayData['item']->rating_count;
if($rating_count == '') {
	$rating_count = 0;
}

$class_name = '';

if ($layout == 'article') {
	$class_name = ' tx-rating';
}
?>
	<dd class="post_rating" id="post_vote_<?php echo $displayData['item']->id; ?>">
		<?php echo JText::_('TX_ARTICLE_RATING'); ?>: <div class="voting-symbol<?php echo $class_name; ?>">
			<?php
			$j = 0;
			for($i = $rating; $i < 5; $i++){
				echo '<span class="star" data-number="'.(5-$j).'"></span>';
				$j = $j+1;
			}
			for ($i = 0; $i < $rating; $i++)
			{
				echo '<span class="star active" data-number="'.($rating - $i).'"></span>';
			}
			?>
		</div>
		<span class="ajax-loader fa fa-spinner fa-spin"></span>
		<span class="voting-result">( <?php echo ($rating_count>1) ? $rating_count . ' ' . JText::_('TX_COUNT_RATINGS') : $rating_count . ' ' . JText::_('TX_COUNT_RATING'); ?> )</span>
</dd>
<?php }