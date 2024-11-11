```php
function dafr_sub_barrio_preprocess_page(&$variables) {

  $sub_theme = \Drupal::config('system.theme')->get('default');
  $theme_path = \Drupal::service('extension.list.theme')->getPath($sub_theme);

  //Header setting -----------
    $header = 'header';
    if(theme_get_setting('default_header')){
      $header = theme_get_setting('default_header');
    }

    if(isset($variables['default_header']) && $variables['default_header'] && $variables['default_header']!='_none' ){
      $header = $variables['default_header'];
    }

    if(isset($variables['dafr_header']) && $variables['dafr_header'] && $variables['dafr_header']!='_none' ){
      $header = $variables['dafr_header'];
    }
    
    $header_skin = '';
    if($sub_theme){
      $theme_path_sub = \Drupal::service('extension.list.theme')->getPath($sub_theme);
      if(file_exists($theme_path_sub . '/templates/page/' . trim($header) . '.html.twig')){
        $header_skin  = $theme_path_sub . '/templates/page/' . trim($header) . '.html.twig';
      }elseif(file_exists($theme_path . '/templates/page/' . trim($header) . '.html.twig')){
        $header_skin  = $theme_path . '/templates/page/' . trim($header) . '.html.twig';
      }
    }else{
      if(file_exists($theme_path . '/templates/page/' . trim($header) . '.html.twig')){
        $header_skin  = $theme_path . '/templates/page/' . trim($header) . '.html.twig';
      }
    }
    if(empty($header_skin)) $header_skin = $theme_path . '/templates/page/header.html.twig';

    $variables['theme_path'] = $theme_path;
    $variables['header_skin'] = $header_skin; 
    $variables['align_header'] = theme_get_setting('align_header');
    $align_header = theme_get_setting('align_header') ? theme_get_setting('align_header') : 'end' ;

}
```
