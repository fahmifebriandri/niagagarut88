<?php
function d($x){
	echo "<pre>"; print_r($x); echo "</pre>";
}
function dd($x){
	echo "<pre>"; print_r($x); echo "</pre>";
	die();
}
function upload_data_to_image($data_image, $new_image_name, $old_image_name,$folder_upload){
	$UPLOAD_DIR_ORI = $folder_upload.'original/';
	$UPLOAD_DIR_DISP = $folder_upload.'display/';
	@unlink($UPLOAD_DIR_ORI . $old_image_name);
	@unlink($UPLOAD_DIR_DISP . $old_image_name);
	$image_parts = explode(";base64,", $data_image);
	$image_type_aux = explode("image/", $image_parts[0]);
	$image_type = $image_type_aux[1];
	$image_base64 = base64_decode($image_parts[1]);
	if($image_type == "png"){
		$file_ori = $UPLOAD_DIR_ORI . $new_image_name . '.png';
		$file_disp = $UPLOAD_DIR_DISP . $new_image_name . '.png';
		$ext = ".png";
	}else if($image_type == "jpeg"){
		$file_ori = $UPLOAD_DIR_ORI . $new_image_name . '.jpg';
		$file_disp = $UPLOAD_DIR_DISP . $new_image_name . '.jpg';
		$ext = ".jpg";
	}
	file_put_contents($file_ori, $image_base64);
	file_put_contents($file_disp, $image_base64);
	
	//-- Crop file untuk display, sebagai usaha untuk compress file	
	list($width, $height, $type, $attr) = getimagesize($file_disp);
	if($image_type == "png"){	
		$im = imagecreatefrompng($file_disp);
		imagealphablending($im, false);
		imagesavealpha($im, true);
		//$size = min(imagesx($im), imagesy($im));
		$im2 = imagecrop($im, ['x' => 0, 'y' => 0, 'width' => $width, 'height' => $height]);
		if ($im2 !== FALSE) {
			imagepng($im2, $file_disp);
			imagedestroy($im2);
		}
		imagedestroy($im);
		$filename = $file_disp;
		$width = 200;
		$height = 200;
		list($width_orig, $height_orig) = getimagesize($filename);
		$ratio_orig = $width_orig/$height_orig;
		if ($width/$height > $ratio_orig) {
		   $width = $height*$ratio_orig;
		} else {
		   $height = $width/$ratio_orig;
		}
		$image_p = imagecreatetruecolor($width, $height);
		$image = imagecreatefrompng($filename);
		imagecopyresampled($image_p, $image, 0, 0, 0, 0, $width, $height, $width_orig, $height_orig);
		imagepng($image_p, $file_disp, 0);
		imagedestroy($image_p);
	}else if($image_type == "jpeg"){
		$im = imagecreatefromjpeg($file_disp);
		//$size = min(imagesx($im), imagesy($im));
		$im2 = imagecrop($im, ['x' => 0, 'y' => 0, 'width' => $width, 'height' => $height]);
		if ($im2 !== FALSE) {
			imagejpeg($im2, $file_disp);
			imagedestroy($im2);
		}
		imagedestroy($im);		
		$filename = $file_disp;
		$width = 200;
		$height = 200;
		list($width_orig, $height_orig) = getimagesize($filename);
		$ratio_orig = $width_orig/$height_orig;
		if ($width/$height > $ratio_orig) {
		   $width = $height*$ratio_orig;
		} else {
		   $height = $width/$ratio_orig;
		}
		$image_p = imagecreatetruecolor($width, $height);
		$image = imagecreatefromjpeg($filename);
		imagecopyresampled($image_p, $image, 0, 0, 0, 0, $width, $height, $width_orig, $height_orig);
		imagejpeg($image_p, $file_disp, 100);
		imagedestroy($image_p);
	}
	return $ext;
}
?>