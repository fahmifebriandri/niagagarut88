<?php
require_once("config.php");
require_once("library_function.php");
/*
db_select
db_insert
db_exec
*/

$request = json_decode(base64_decode($_REQUEST['data_param']),true);
$action = $request['action'];

if($action == "appRegister"){
	$data_user = $request['data_user'];
	$res = db_select("SELECT email FROM `app_user` where hapus='0' and email = '".$data_user['email']."' ;")['data'];
	if($res == 0){
		$result = db_insert("
							INSERT INTO `app_user` SET
								email = '".$data_user['email']."',
								password = '".md5($data_user['password'])."',
								nama_lengkap = '".$data_user['nama_lengkap']."',
								id_user_group = '2',
								id_user_owner = '1',
								created_by = '1',
								reference_by_affiliate_code = '".@$data_user['reference_by_affiliate_code']."'
							;");
		$return['result'] = $result;
		$return['message'] = "Anda berhasil daftar, silahkan login!";
	}else{
		$return['result'] = $data_user['email']." : ".count($res);
		$return['message'] = "Email sudah terdaftar!";
	}
	echo json_encode($return);
}
else if($action == "appLogin"){
	$data_user = $request['data_user'];
	$res['user'] = db_select("SELECT a.*, b.name as nama_group
								FROM `app_user` a 
								INNER JOIN `app_user_group` b ON b.id = a.id_user_group
								WHERE 
									a.aktif = '1' and 
									a.hapus = '0' and 
									a.email = '".$data_user['email']."' and 
									a.password = '".md5($data_user['password'])."' 
									ORDER BY a.nama_lengkap ASC;");
	$res['menu'] = db_select("
								SELECT a.* FROM `app_menu` a 
								INNER JOIN app_user_group_access b ON b.id_menu = a.id
								INNER JOIN app_user c ON c.id_user_group = b.id_user_group
								WHERE 
									c.aktif = '1' and 
									c.hapus = '0' and 
									c.email = '".$data_user['email']."' and 
									c.password = '".md5($data_user['password'])."' 
								ORDER BY a.`parent`, a.`urut`;
	");
	
	$res['profile_toko'] = db_select("
								SELECT a.* FROM `tb_profile_toko` a
								INNER JOIN `app_user` b ON b.id = a.id_user_owner OR b.id_user_owner = a.id_user_owner
								WHERE 
								b.email = '".$data_user['email']."' and 
								b.password = '".md5($data_user['password'])."' 
	");
	echo json_encode($res);
}
else if($action == "loadDataUser"){
	$data_user = $request['data_user'];
	$id_user = $data_user['id'];
	$created_by = $data_user['created_by'];
	$id_user_owner=($created_by == 1)?$id_user:$created_by;
	
	$res = db_select("SELECT a.*, b.name as nama_group
								FROM `app_user` a 
								INNER JOIN `app_user_group` b ON b.id = a.id_user_group
								WHERE 
									a.hapus = '0'
									AND a.id_user_owner = '".$id_user_owner."'
								ORDER BY a.tanggal_input DESC;");
	echo json_encode($res);
}
else if($action == "addAppUser"){
	$data_user = $request['data_user'];
	$id_user = $data_user['id'];
	$created_by = $data_user['created_by'];
	$id_user_owner=($created_by == 1)?$id_user:$created_by;
	
	$data_user = $request['data_user_submit'];
	$res = db_select("SELECT email FROM `app_user` where hapus='0' AND email = '".$data_user['email']."' ;")['data'];
	if($res > 0){
		$return['result'] = $data_user['email']." : ".count($res);
		$return['message'] = "Email sudah terdaftar!";
	}else{
		$result = db_insert("INSERT INTO `app_user` (email,password,nama_lengkap,telepon,id_user_group,aktif,id_user_owner,created_by) VALUE ('".$data_user['email']."', '".md5($data_user['password'])."', '".$data_user['nama_lengkap']."','".$data_user['telepon']."','".$data_user['id_user_group']."','".$data_user['aktif']."','".$id_user_owner."','".$id_user."') ;");
		$return['result'] = $result;
		$return['message'] = "Anda berhasil menambah user!";
	}
	echo json_encode($return);
}
else if($action == "updateAppUser"){
	$data_user = $request['data_user'];
	$id_user = $data_user['id'];
	$created_by = $data_user['created_by'];
	$id_user_owner=($created_by == 1)?$id_user:$created_by;
	
	$data_user = $request['data_user_submit'];
	$res = db_select("SELECT email FROM `app_user` where hapus='0' AND email = '".$data_user['email']."' AND id != '".$data_user['id']."';")['data'];
	if($res > 0){
		$return['result'] = $data_user['email']." : ".count($res);
		$return['message'] = "Email sudah terdaftar!";
	}else{
		$update_password = "";
		if($data_user['password'] != "") $update_password = " password = '".md5($data_user['password'])."', ";
		$result = db_exec("UPDATE `app_user` SET 
												email = '".$data_user['email']."',
												".$update_password."
												nama_lengkap = '".$data_user['nama_lengkap']."',
												telepon = '".$data_user['telepon']."',
												id_user_group = '".$data_user['id_user_group']."',
												aktif = '".$data_user['aktif']."',
												updated_by = '".$id_user."'
											WHERE
												id = '".$data_user['id']."'
											;");
		$return['result'] = $result;
		$return['message'] = "Anda berhasil update user!";
	}
	echo json_encode($return);
}
else if($action == "deleteAppUser"){
	$id_user = $request['id_user'];
	if($id_user != "1"){
		db_exec("UPDATE app_user SET hapus='1' WHERE id = '".$id_user."' ;");
		$return['result'] = "1";
		$return['message'] = "";
	}else{
		$return['result'] = "1";
		$return['message'] = "User ini tidak boleh di hapus, dikunci oleh sistem!";
	}
	echo json_encode($return);
}
else if($action == "loadAppMenu"){
	//$id_user = $request['id_user'];
	$res = array();
	$res['app_menu'] = db_select("SELECT * FROM `app_menu` ORDER BY `parent` ASC, `urut` ASC;");
	echo json_encode($res);
}
else if($action == "loadUserGroup"){
	$data_user = $request['data_user'];
	$id_user = $data_user['id'];
	$created_by = $data_user['created_by'];
	$id_user_owner=($created_by == 1)?$id_user:$created_by;
	$result = db_select("SELECT * FROM `app_user_group` where hapus='0' and id_user_owner = '".$id_user_owner."' ORDER BY `name` ASC;");
	if(is_array($result['data'])){
		foreach($result['data'] as $key => $val){
			$result_access = db_select("select * from app_user_group_access where hapus='0' and id_user_group = '".$val['id']."' ;");
			$result['data'][$key]['data_access'] = $result_access['data'];
		}
	}
	$res = array();
	$res['app_user_group'] = $result;
	echo json_encode($res);
}
else if($action == "addUserGroup"){
	$data_user = $request['data_user'];
	$id_user = $data_user['id'];
	$created_by = $data_user['created_by'];
	$id_user_owner=($created_by == 1)?$id_user:$created_by;
	
	$data_group_access = $request['data_group_access'];
	$id_user_group = db_insert("INSERT INTO `app_user_group` (name,id_user_owner,created_by) VALUE ('".$data_group_access['nama']."', '".$id_user_owner."', '".$id_user."') ;");
	if(isset($data_group_access['checked'])){
		$checked = $data_group_access['checked'];
		foreach($checked as $key => $val){
			$insert_id = db_insert("INSERT INTO `app_user_group_access` (id_user_group,id_menu,created_by) VALUE ('".$id_user_group."', '".$key."', '".$id_user."') ;");
		}
	}
	$return['result'] = "1";
	$return['message'] = "User Group berhasil disimpan!";
	echo json_encode($return);
}
else if($action == "updateUserGroup"){
	$data_user = $request['data_user'];
	$id_user = $data_user['id'];
	$created_by = $data_user['created_by'];
	$id_user_owner=($created_by == 1)?$id_user:$created_by;
	$data_group_access = $request['data_group_access'];
	$id_user_group = $data_group_access['id_user_group'];
	
	db_exec("UPDATE `app_user_group` SET name='".$data_group_access['nama']."', updated_by='".$id_user."' where id = '".$id_user_group."' ;");
	db_exec("DELETE FROM app_user_group_access where id_user_group = '".$id_user_group."' ;");
	
	if(isset($data_group_access['checked'])){
		$checked = $data_group_access['checked'];
		foreach($checked as $key => $val){
			if($val === true)
			$insert_id = db_insert("INSERT INTO `app_user_group_access` (id_user_group,id_menu,updated_by) VALUE ('".$id_user_group."', '".$key."', '".$id_user."') ;");
		}
	}
	$return['result'] = "1";
	$return['message'] = "User Group berhasil diupdate!";
	echo json_encode($return);
}
else if($action == "deleteUserGroup"){
	$id_user_group = $request['id_user_group'];
	$count = db_select("SELECT COUNT(id) count FROM `app_user` WHERE hapus = '0' AND id_user_group = '".$id_user_group."';")['data'][0]['count'];
	if($count == 0){
		db_exec("UPDATE `app_user_group` SET hapus='1' where id = '".$id_user_group."' ;");
		db_exec("UPDATE `app_user_group_access` SET hapus='1' where id_user_group = '".$id_user_group."' ;");
		$return['result'] = "1";
		$return['message'] = "";
	}else{
		$return['result'] = "1";
		$return['message'] = "(".$count.") user sedang menggunakan, User Group ini tidak bisa dihapus!"
							."\n\n(*) Jika anda ingin menghapus, pastikan tidak ada user yang menggunakan User Group ini!";
	}
	echo json_encode($return);
}
else if($action == "loadProdukLimit"){
	$data_user = $request['data_user'];
	$id_user = $data_user['id'];
	$created_by = $data_user['created_by'];
	$id_user_owner=($created_by == 1)?$id_user:$created_by;
	$min_stok = db_select("SELECT min_stok FROM `tb_profile_toko` where id_user_owner = '".$id_user_owner."';")['data'][0]['min_stok'];
	$result = db_select("
							SELECT * FROM `tb_produk` a 
										INNER JOIN tb_produk_varian b on b.id_produk = a.id 
										WHERE 
											a.aktif = '1' 
											AND a.pengirim_produk = 'pribadi'
											AND a.hapus = '0' 
											AND a.id_user_owner = '".$id_user_owner."' 
											AND b.stat_hanya_foto = '0' 
											AND b.stok <= ".$min_stok."
						");
	echo json_encode($result);
}
else if($action == "loadProfileToko"){
	$data_user = $request['data_user'];
	$id_user = $data_user['id'];
	$created_by = $data_user['created_by'];
	$id_user_owner=($created_by == 1)?$id_user:$created_by;
	$result = db_select("SELECT * FROM `tb_profile_toko` where id_user_owner = '".$id_user_owner."';")['data'][0];
	echo json_encode($result);
}
else if($action == "loadProfileSaya"){
	$data_user = $request['data_user'];
	$id_user = $data_user['id'];
	$created_by = $data_user['created_by'];
	$id_user_owner=($created_by == 1)?$id_user:$created_by;
	$result = db_select("SELECT * FROM `app_user` where id = '".$id_user."';")['data'][0];
	echo json_encode($result);
}
else if($action == "updateProfileToko"){
	$data_profile = $request['data_profile'];
	$data_user = $request['data_user'];
	$id_user = $data_user['id'];
	$created_by = $data_user['created_by'];
	$id_user_owner=($created_by == 1)?$id_user:$created_by;
	
	$old_image_name = db_select("SELECT logo FROM `tb_profile_toko` where id_user_owner = '".$id_user_owner."';")['data'][0]['logo'];
	$logo_name = "";
	if(isset($data_profile['logo']) and $data_profile['logo'] != $old_image_name){
		$new_image_name = date("Ymdhisa")."-".md5(uniqid())."-".str_replace("\\","-",str_replace("/","-",str_replace(" ","-",$data_profile['nama'])));
		$ext = upload_data_to_image($data_profile['logo'],$new_image_name,$old_image_name,'../assets/upload/logo/');
		$logo_name = $new_image_name.$ext;
	}else{
		$logo_name = $old_image_name;
	}
	
	$data_profile = ar_str_safe($data_profile);
	$res = db_select("SELECT * FROM `tb_profile_toko` where id_user_owner = '".$id_user_owner."' ;")['data'];
	if($res > 0){
		db_exec("UPDATE `tb_profile_toko` SET 
											logo='".$logo_name."', 
											nama='".$data_profile['nama']."', 
											id_propinsi='".$data_profile['id_propinsi']."', 
											id_kabupaten='".$data_profile['id_kabupaten']."', 
											id_kecamatan='".$data_profile['id_kecamatan']."', 
											id_kelurahan='".$data_profile['id_kelurahan']."', 
											kode_pos='".$data_profile['kode_pos']."', 
											alamat='".$data_profile['alamat']."', 
											latitude='".$data_profile['latitude']."', 
											longitude='".$data_profile['longitude']."', 
											max_jarak='".$data_profile['max_jarak']."', 
											telepon='".$data_profile['telepon']."', 
											deskripsi='".@$data_profile['deskripsi']."', 
											min_stok='".$data_profile['min_stok']."', 
											width_print_page='".$data_profile['width_print_page']."', 
											print_border='".$data_profile['print_border']."', 
											print_margin_left='".$data_profile['print_margin_left']."', 
											print_font_size='".$data_profile['print_font_size']."', 
											updated_by='".$id_user."' 
										  WHERE 
											id_user_owner = '".$id_user_owner."' 
										;");
	}else{
		db_exec("INSERT INTO `tb_profile_toko` SET
							id_user_owner = '".$id_user_owner."',
							logo = '".$logo_name."',
							nama='".$data_profile['nama']."', 
							id_propinsi='".$data_profile['id_propinsi']."', 
							id_kabupaten='".$data_profile['id_kabupaten']."', 
							id_kecamatan='".$data_profile['id_kecamatan']."', 
							id_kelurahan='".$data_profile['id_kelurahan']."', 
							kode_pos='".$data_profile['kode_pos']."', 
							alamat='".$data_profile['alamat']."', 
							latitude='".$data_profile['latitude']."', 
							longitude='".$data_profile['longitude']."', 
							max_jarak='".$data_profile['max_jarak']."', 
							telepon='".$data_profile['telepon']."', 
							deskripsi='".$data_profile['deskripsi']."', 
							min_stok='".$data_profile['min_stok']."', 
							width_print_page='".$data_profile['width_print_page']."', 
							print_border='".$data_profile['print_border']."', 
							print_margin_left='".$data_profile['print_margin_left']."', 
							print_font_size='".$data_profile['print_font_size']."', 
							created_by = '".$id_user."'
							
						;");
	}
	$return = array();
	$return['result'] = "1";
	$return['message'] = "Update Profile Berhasil!";
	echo json_encode($return);
}
else if($action == "updateProfileSaya"){
	$data_profile_saya = $request['data_profile_saya'];
	$data_user = $request['data_user'];
	$id_user = $data_user['id'];
	$created_by = $data_user['created_by'];
	$id_user_owner=($created_by == 1)?$id_user:$created_by;
	
	db_exec("UPDATE `app_user` SET 
										nama_lengkap='".$data_profile_saya['nama_lengkap']."', 
										telepon='".$data_profile_saya['telepon']."',
										updated_by='".$id_user."' 
									  WHERE 
										id = '".$id_user."' 
									;");
	if($data_profile_saya['npassword'] != "" and $data_profile_saya['upassword'] != "" and $data_profile_saya['npassword'] == $data_profile_saya['upassword']){
		db_exec("UPDATE `app_user` SET 
											password='".md5($data_profile_saya['npassword'])."',
											updated_by='".$id_user."' 
										  WHERE 
											id = '".$id_user."' 
										;");
	}
	$return = array();
	$return['result'] = "1";
	$return['message'] = "Update Profile Saya Berhasil!";
	echo json_encode($return);
}
else if($action == "loadDataKategori"){
	$data_user = $request['data_user'];
	$id_user = $data_user['id'];
	$created_by = $data_user['created_by'];
	$id_user_owner=($created_by == 1)?$id_user:$created_by;
	$res = array();
	$where_filter = "";
	if(isset($request['data_filter']) and $request['data_filter'] != null and $request['data_filter'] != ""){
		$data_filter = $request['data_filter'];
		if($data_filter['aktif']){
			$where_filter = " and aktif = '".$data_filter['aktif']."' ";
		}
	}
	$res = db_select("SELECT * FROM `tb_kategori` where hapus='0' ".$where_filter." and id_user_owner = '".$id_user_owner."' ORDER BY `id` DESC;");
	echo json_encode($res);
}
else if($action == "addKategori"){
	$data_user = $request['data_user'];
	$id_user = $data_user['id'];
	$created_by = $data_user['created_by'];
	$id_user_owner=($created_by == 1)?$id_user:$created_by;
	
	$data_kategori = $request['data_kategori'];
	$res = db_select("SELECT kode FROM `tb_kategori` where hapus='0' and kode = '".$data_kategori['kode']."' and id_user_owner = '".$id_user_owner."' ;")['data'];

	if($res > 0){
		$return['result'] = $data_kategori['kode']." : ".count($res);
		$return['message'] = "Kode sudah terdaftar!";
	}else{
		$foto_name = "";
		if(isset($data_kategori['foto_file']) and $data_kategori['foto_file'] != ""){
			$new_image_name = date("Ymdhisa")."-".md5(uniqid())."-".str_replace("\\","-",str_replace("/","-",str_replace(" ","-",$data_kategori['nama'])));
			$ext = upload_data_to_image($data_kategori['foto_file'],$new_image_name,null,'../assets/upload/kategori/');
			$foto_name = $new_image_name.$ext;
		}
		
		$result = db_insert("INSERT INTO `tb_kategori` SET
											kode = '".$data_kategori['kode']."',
											nama = '".$data_kategori['nama']."',
											foto = '".$foto_name."',
											aktif = '".$data_kategori['aktif']."',
											id_user_owner = '".$id_user_owner."',
											created_by = '".$id_user."'
						;");
		
		$return['result'] = $result;
		$return['message'] = "Anda berhasil menambah kategori!";
	}
	echo json_encode($return);
}
else if($action == "updateKategori"){
	$data_user = $request['data_user'];
	$id_user = $data_user['id'];
	$created_by = $data_user['created_by'];
	$id_user_owner=($created_by == 1)?$id_user:$created_by;
	
	$data_kategori = $request['data_kategori'];
	$res = db_select("SELECT kode FROM `tb_kategori` where hapus='0' and kode = '".$data_kategori['kode']."' AND id_user_owner = '".$id_user_owner."' AND id != '".$data_kategori['id']."' ;")['data'];
	if($res > 0){
		$return['result'] = $data_kategori['kode']." : ".count($res);
		$return['message'] = "Kode sudah terdaftar!";
	}else{
		
		$foto_name = @$data_kategori['foto'];
		if(isset($data_kategori['foto_file']) and $data_kategori['foto_file'] != ""){
			$new_image_name = date("Ymdhisa")."-".md5(uniqid())."-".str_replace("\\","-",str_replace("/","-",str_replace(" ","-",$data_kategori['nama'])));
			$ext = upload_data_to_image($data_kategori['foto_file'],$new_image_name,$foto_name,'../assets/upload/kategori/');
			$foto_name = $new_image_name.$ext;
		}
		
		
		$result = db_exec("UPDATE `tb_kategori` SET 
												kode = '".$data_kategori['kode']."',
												nama = '".$data_kategori['nama']."',
												foto = '".$foto_name."',
												aktif = '".$data_kategori['aktif']."',
												updated_by = '".$id_user."'
											WHERE
												id = '".$data_kategori['id']."'
											;");
		$return['result'] = $result;
		$return['message'] = "Anda berhasil update kategori!";
	}
	echo json_encode($return);
}
else if($action == "deleteKategori"){
	$id_kategori = $request['id_kategori'];
	$data_produk = db_select("SELECT id FROM `tb_produk` where hapus='0' and id_kategori = '".$id_kategori."' ;")['data'];
	if($data_produk == 0){
		db_exec("UPDATE `tb_kategori` SET hapus='1' where id = '".$id_kategori."' ;");
		
		$folder_upload = '../assets/upload/kategori/';
		$UPLOAD_DIR_ORI = $folder_upload.'original/';
		$UPLOAD_DIR_DISP = $folder_upload.'display/';
		$res = db_select("SELECT foto FROM `tb_kategori` where id = '".$id_kategori."' ;")['data'];
		if($res > 0){
			foreach($res as $row){
				if($row['foto'] != ""){
					@unlink($UPLOAD_DIR_ORI . $row['foto']);
					@unlink($UPLOAD_DIR_DISP . $row['foto']);
				}
			}
		}
		
		$return['result'] = "1";
		$return['message'] = "";
	}else{
		$return['result'] = "1";
		$return['message'] = "Kategori ini tidak bisa dihapus, ada ".count($data_produk)." produk menggunakan kategori ini!";
	}
	echo json_encode($return);
}
else if($action == "loadDataSuplier"){
	$data_user = $request['data_user'];
	$id_user = $data_user['id'];
	$created_by = $data_user['created_by'];
	$id_user_owner=($created_by == 1)?$id_user:$created_by;
	$res = array();
	$res = db_select("SELECT * FROM `tb_suplier` where hapus='0' and id_user_owner = '".$id_user_owner."' ORDER BY `id` DESC;");
	echo json_encode($res);
}
else if($action == "addSuplier"){
	$data_user = $request['data_user'];
	$id_user = $data_user['id'];
	$created_by = $data_user['created_by'];
	$id_user_owner=($created_by == 1)?$id_user:$created_by;
	
	$data_suplier = $request['data_suplier'];
	$res = db_select("SELECT nama FROM `tb_suplier` where hapus='0' and nama = '".$data_suplier['nama']."' and id_user_owner = '".$id_user_owner."' ;")['data'];

	if($res > 0){
		$return['result'] = $data_suplier['nama']." : ".count($res);
		$return['message'] = "Nama sudah terdaftar!";
	}else{
		$result = db_insert("INSERT INTO `tb_suplier` SET
							nama = '".$data_suplier['nama']."',
							no_telepon = '".$data_suplier['no_telepon']."',
							id_propinsi='".$data_suplier['id_propinsi']."', 
							id_kabupaten='".$data_suplier['id_kabupaten']."', 
							id_kecamatan='".$data_suplier['id_kecamatan']."', 
							id_kelurahan='".$data_suplier['id_kelurahan']."', 
							kode_pos='".$data_suplier['kode_pos']."', 
							alamat = '".$data_suplier['alamat']."',
							diskon = '".$data_suplier['diskon']."',
							tipe_diskon = '".$data_suplier['tipe_diskon']."',
							keterangan = '".@$data_suplier['keterangan']."',
							sumber_produk = '".$data_suplier['sumber_produk']."',
							aktif = '".$data_suplier['aktif']."',
							id_user_owner = '".$id_user_owner."',
							created_by = '".$id_user."'
						;");
		
		$return['result'] = $result;
		$return['message'] = "Anda berhasil menambah suplier!";
	}
	echo json_encode($return);
}
else if($action == "updateSuplier"){
	$data_user = $request['data_user'];
	$id_user = $data_user['id'];
	$created_by = $data_user['created_by'];
	$id_user_owner=($created_by == 1)?$id_user:$created_by;
	
	$data_suplier = $request['data_suplier'];
	$res = db_select("SELECT nama FROM `tb_suplier` where hapus='0' and nama = '".$data_suplier['nama']."' AND id_user_owner = '".$id_user_owner."' AND id != '".$data_suplier['id']."' ;")['data'];
	if($res > 0){
		$return['result'] = $data_suplier['nama']." : ".count($res);
		$return['message'] = "Nama sudah terdaftar!";
	}else{
		$result = db_exec("UPDATE `tb_suplier` SET 
												nama = '".$data_suplier['nama']."',
												no_telepon = '".$data_suplier['no_telepon']."',
												id_propinsi='".$data_suplier['id_propinsi']."', 
												id_kabupaten='".$data_suplier['id_kabupaten']."', 
												id_kecamatan='".$data_suplier['id_kecamatan']."', 
												id_kelurahan='".$data_suplier['id_kelurahan']."', 
												kode_pos='".$data_suplier['kode_pos']."', 
												alamat = '".$data_suplier['alamat']."',
												diskon = '".$data_suplier['diskon']."',
												tipe_diskon = '".$data_suplier['tipe_diskon']."',
												keterangan = '".$data_suplier['keterangan']."',
												sumber_produk = '".$data_suplier['sumber_produk']."',
												aktif = '".$data_suplier['aktif']."',
												updated_by = '".$id_user."'
											WHERE
												id = '".$data_suplier['id']."'
											;");
		$return['result'] = $result;
		$return['message'] = "Anda berhasil update suplier!";
	}
	echo json_encode($return);
}
else if($action == "deleteSuplier"){
	$id_suplier = $request['id_suplier'];
	db_exec("UPDATE `tb_suplier` SET hapus='1' where id = '".$id_suplier."' ;");
	$return['result'] = "1";
	$return['message'] = "";
	echo json_encode($return);
}
else if($action == "loadDataMembership"){
	$data_user = $request['data_user'];
	$id_user = $data_user['id'];
	$created_by = $data_user['created_by'];
	$id_user_owner=($created_by == 1)?$id_user:$created_by;
	$res = array();
	$res = db_select("SELECT * FROM `tb_membership` where hapus='0' and id_user_owner = '".$id_user_owner."' ORDER BY `id` DESC;");
	echo json_encode($res);
}
else if($action == "addMembership"){
	$data_user = $request['data_user'];
	$id_user = $data_user['id'];
	$created_by = $data_user['created_by'];
	$id_user_owner=($created_by == 1)?$id_user:$created_by;
	
	$data_membership = $request['data_membership'];
	$res = db_select("SELECT nama FROM `tb_membership` where hapus='0' and nama = '".$data_membership['nama']."' and id_user_owner = '".$id_user_owner."' ;")['data'];

	if($res > 0){
		$return['result'] = $data_membership['nama']." : ".count($res);
		$return['message'] = "Nama sudah terdaftar!";
	}else{
		$result = db_insert("INSERT INTO `tb_membership` SET
							nama = '".$data_membership['nama']."',
							diskon = '".$data_membership['diskon']."',
							tipe_diskon = '".$data_membership['tipe_diskon']."',
							aktif = '".$data_membership['aktif']."',
							id_user_owner = '".$id_user_owner."',
							created_by = '".$id_user."'
						;");
		
		$return['result'] = $result;
		$return['message'] = "Anda berhasil menambah membership!";
	}
	echo json_encode($return);
}
else if($action == "updateMembership"){
	$data_user = $request['data_user'];
	$id_user = $data_user['id'];
	$created_by = $data_user['created_by'];
	$id_user_owner=($created_by == 1)?$id_user:$created_by;
	
	$data_membership = $request['data_membership'];
	$res = db_select("SELECT nama FROM `tb_membership` where hapus='0' and nama = '".$data_membership['nama']."' AND id_user_owner = '".$id_user_owner."' AND id != '".$data_membership['id']."' ;")['data'];
	if($res > 0){
		$return['result'] = $data_membership['nama']." : ".count($res);
		$return['message'] = "Nama sudah terdaftar!";
	}else{
		$result = db_exec("UPDATE `tb_membership` SET 
												nama = '".$data_membership['nama']."',
												diskon = '".$data_membership['diskon']."',
												tipe_diskon = '".$data_membership['tipe_diskon']."',
												aktif = '".$data_membership['aktif']."',
												updated_by = '".$id_user."'
											WHERE
												id = '".$data_membership['id']."'
											;");
		$return['result'] = $result;
		$return['message'] = "Anda berhasil update membership!";
	}
	echo json_encode($return);
}
else if($action == "deleteMembership"){
	$id_membership = $request['id_membership'];
	$count = db_select("SELECT COUNT(id) count FROM `tb_customer` WHERE hapus = '0' and id_membership = '".$id_membership."';")['data'][0]['count'];
	if($count == 0){
		db_exec("UPDATE `tb_membership` SET hapus='1'  where id = '".$id_membership."' ;");
		$return['result'] = "1";
		$return['message'] = "";
	}else{
		$return['result'] = "1";
		$return['message'] = "(".$count.") user sedang menggunakan, Membership ini tidak bisa dihapus!"
							."\n\n(*) Jika anda ingin menghapus, pastikan tidak ada user yang menggunakan Membership ini!";
	}
	echo json_encode($return);
}
else if($action == "loadDataKurir"){
	$data_user = $request['data_user'];
	$id_user = $data_user['id'];
	$created_by = $data_user['created_by'];
	$id_user_owner=($created_by == 1)?$id_user:$created_by;
	$res = array();
	$res = db_select("SELECT * FROM `tb_kurir` where hapus='0' and id_user_owner = '".$id_user_owner."' ORDER BY `id` DESC;");
	echo json_encode($res);
}
else if($action == "addKurir"){
	$data_user = $request['data_user'];
	$id_user = $data_user['id'];
	$created_by = $data_user['created_by'];
	$id_user_owner=($created_by == 1)?$id_user:$created_by;
	
	$data_kurir = $request['data_kurir'];
	$res = db_select("SELECT nama FROM `tb_kurir` where hapus='0' and nama = '".$data_kurir['nama']."' and id_user_owner = '".$id_user_owner."' ;")['data'];

	if($res > 0){
		$return['result'] = $data_kurir['nama']." : ".count($res);
		$return['message'] = "Nama sudah terdaftar!";
	}else{
		$result = db_insert("INSERT INTO `tb_kurir` SET
							nama = '".$data_kurir['nama']."',
							diskon = '".$data_kurir['diskon']."',
							tipe_diskon = '".$data_kurir['tipe_diskon']."',
							aktif = '".$data_kurir['aktif']."',
							id_user_owner = '".$id_user_owner."',
							created_by = '".$id_user."'
						;");
		
		$return['result'] = $result;
		$return['message'] = "Anda berhasil menambah kurir!";
	}
	echo json_encode($return);
}
else if($action == "updateKurir"){
	$data_user = $request['data_user'];
	$id_user = $data_user['id'];
	$created_by = $data_user['created_by'];
	$id_user_owner=($created_by == 1)?$id_user:$created_by;
	
	$data_kurir = $request['data_kurir'];
	$res = db_select("SELECT nama FROM `tb_kurir` where hapus='0' and nama = '".$data_kurir['nama']."' AND id_user_owner = '".$id_user_owner."' AND id != '".$data_kurir['id']."' ;")['data'];
	if($res > 0){
		$return['result'] = $data_kurir['nama']." : ".count($res);
		$return['message'] = "Nama sudah terdaftar!";
	}else{
		$result = db_exec("UPDATE `tb_kurir` SET 
												nama = '".$data_kurir['nama']."',
												diskon = '".$data_kurir['diskon']."',
												tipe_diskon = '".$data_kurir['tipe_diskon']."',
												aktif = '".$data_kurir['aktif']."',
												updated_by = '".$id_user."'
											WHERE
												id = '".$data_kurir['id']."'
											;");
		$return['result'] = $result;
		$return['message'] = "Anda berhasil update kurir!";
	}
	echo json_encode($return);
}
else if($action == "deleteKurir"){
	$id_kurir = $request['id_kurir'];
	$count = db_select("SELECT COUNT(id) count FROM `tb_customer` WHERE hapus = '0' and id_kurir = '".$id_kurir."';")['data'][0]['count'];
	if($count == 0){
		db_exec("UPDATE `tb_kurir` SET hapus='1'  where id = '".$id_kurir."' ;");
		$return['result'] = "1";
		$return['message'] = "";
	}else{
		$return['result'] = "1";
		$return['message'] = "(".$count.") user sedang menggunakan, Kurir ini tidak bisa dihapus!"
							."\n\n(*) Jika anda ingin menghapus, pastikan tidak ada user yang menggunakan Kurir ini!";
	}
	echo json_encode($return);
}
else if($action == "getCustomerByName"){
	$data_user = $request['data_user'];
	$id_user = $data_user['id'];
	$created_by = $data_user['created_by'];
	$id_user_owner=($created_by == 1)?$id_user:$created_by;
	$res = array();
	$where_filter = "";
	if(isset($request['data_filter']) and $request['data_filter'] != null and $request['data_filter'] != ""){
		$data_filter = $request['data_filter'];
		if($data_filter['nama_pemesan']){
			$where_filter = " and a.nama_lengkap like '%".$data_filter['nama_pemesan']."%' and a.aktif = '".$data_filter['aktif']."' ";
		}
	}
	$res = db_select("SELECT a.*, b.nama as membership, b.tipe_diskon as diskon_tipe, b.diskon as diskon_nilai
								FROM `tb_customer` a
								LEFT JOIN tb_membership b ON b.id = a.id_membership
								where 
									a.hapus='0' 
									and a.id_user_owner = '".$id_user_owner."' 
									".$where_filter."
								LIMIT 5
								;");
	echo json_encode($res);
}
else if($action == "loadDataCustomer"){
	$data_user = $request['data_user'];
	$id_user = $data_user['id'];
	$created_by = $data_user['created_by'];
	$id_user_owner=($created_by == 1)?$id_user:$created_by;
	$res = array();
	$res = db_select("SELECT a.*, b.nama as nama_membership FROM `tb_customer` as a
							   LEFT JOIN `tb_membership` as b ON b.id = a.id_membership
							   where 
									a.hapus = '0' 
									and a.id_user_owner = '".$id_user_owner."' 
							   ORDER BY a.id DESC;");
	echo json_encode($res);
}
else if($action == "addCustomer"){
	$data_user = $request['data_user'];
	$id_user = $data_user['id'];
	$created_by = $data_user['created_by'];
	$id_user_owner=($created_by == 1)?$id_user:$created_by;
	
	$data_customer = $request['data_customer'];
	$res = db_select("SELECT id FROM `tb_customer` where 
														hapus = '0'
														and id_user_owner = '".$id_user_owner."' 
														and email = '".$data_customer['email']."' 
					;")['data'];

	if($res > 0){
		$return['result'] = $data_customer['nama_lengkap']." : ".count($res);
		$return['message'] = "Customer dengan email ini sudah terdaftar!";
	}else{
		$result = db_insert("INSERT INTO `tb_customer` SET
										id_membership = '".$data_customer['id_membership']."',
										nama_lengkap = '".$data_customer['nama_lengkap']."',
										no_telepon = '".$data_customer['no_telepon']."',
										email = '".$data_customer['email']."',
										id_propinsi = '".$data_customer['id_propinsi']."',
										id_kabupaten = '".$data_customer['id_kabupaten']."',
										id_kecamatan = '".$data_customer['id_kecamatan']."',
										id_kelurahan = '".$data_customer['id_kelurahan']."',
										kode_pos = '".$data_customer['kode_pos']."',
										alamat_lengkap = '".$data_customer['alamat_lengkap']."',
										aktif = '".$data_customer['aktif']."',
										id_user_owner = '".$id_user_owner."',
										created_by = '".$id_user."'
						;");
		
		$return['result'] = $result;
		$return['message'] = "Anda berhasil menambah Customer!";
	}
	echo json_encode($return);
}
else if($action == "updateCustomer"){
	$data_user = $request['data_user'];
	$id_user = $data_user['id'];
	$created_by = $data_user['created_by'];
	$id_user_owner=($created_by == 1)?$id_user:$created_by;
	
	$data_customer = $request['data_customer'];
	$res = db_select("SELECT id FROM `tb_customer` where 
														hapus = '0'
														and id_user_owner = '".$id_user_owner."' 
														and no_telepon = '".$data_customer['no_telepon']."' 
														and email = '".$data_customer['email']."' 
														and id != '".$data_customer['id']."' ;")['data'];
	if($res > 0){
		$return['result'] = $data_customer['nama']." : ".count($res);
		$return['message'] = "Customer dengan no telepon dan email ini sudah terdaftar!";
	}else{
		$result = db_exec("UPDATE `tb_customer` SET 
												id_membership = '".$data_customer['id_membership']."',
												nama_lengkap = '".$data_customer['nama_lengkap']."',
												no_telepon = '".$data_customer['no_telepon']."',
												email = '".$data_customer['email']."',
												id_propinsi = '".$data_customer['id_propinsi']."',
												id_kabupaten = '".$data_customer['id_kabupaten']."',
												id_kecamatan = '".$data_customer['id_kecamatan']."',
												id_kelurahan = '".$data_customer['id_kelurahan']."',
												kode_pos = '".$data_customer['kode_pos']."',
												alamat_lengkap = '".$data_customer['alamat_lengkap']."',
												aktif = '".$data_customer['aktif']."',
												updated_by = '".$id_user."'
											WHERE
												id = '".$data_customer['id']."'
											;");
		$return['result'] = $result;
		$return['message'] = "Anda berhasil update Customer!";
	}
	echo json_encode($return);
}
else if($action == "deleteCustomer"){
	$id_customer = $request['id_customer'];
	db_exec("UPDATE `tb_customer` SET hapus='1' WHERE id = '".$id_customer."' ;");
	$return['result'] = "1";
	$return['message'] = "";
	echo json_encode($return);
}
else if($action == "loadDataPropinsi"){
	$res = array();
	$res = db_select("SELECT DISTINCT(provinsi) as provinsi FROM `tb_wilayah` 
															ORDER BY provinsi ASC");
	echo json_encode($res);
}
else if($action == "loadDataKabupaten"){
	$id_provinsi = $request['id_provinsi'];
	$res = array();
	$res = db_select("SELECT DISTINCT(CONCAT(kota_kab,' ' ,nama_kota_kab)) as kota_kab FROM `tb_wilayah` WHERE 
																						provinsi='".$id_provinsi."' 
																						ORDER BY kota_kab ASC, nama_kota_kab ASC");
	echo json_encode($res);
}
else if($action == "loadDataKecamatan"){
	$id_provinsi = $request['id_provinsi'];
	$id_kabupaten = $request['id_kabupaten'];
	$res = array();
	$res = db_select("SELECT DISTINCT(kec) as kecamatan FROM `tb_wilayah` WHERE 
														provinsi='".$id_provinsi."' 
														and CONCAT(kota_kab,' ' ,nama_kota_kab)='".$id_kabupaten."' 
														ORDER BY kec ASC");
	echo json_encode($res);
}
else if($action == "loadDataKelurahan"){
	$id_provinsi = $request['id_provinsi'];
	$id_kabupaten = $request['id_kabupaten'];
	$id_kecamatan = $request['id_kecamatan'];
	$res = array();
	$res = db_select("SELECT DISTINCT(kel) as kelurahan FROM `tb_wilayah` WHERE 
														provinsi='".$id_provinsi."' 
														and CONCAT(kota_kab,' ' ,nama_kota_kab)='".$id_kabupaten."' 
														and kec='".$id_kecamatan."' 
														ORDER BY kel ASC");
	echo json_encode($res);
}
else if($action == "loadDataKodePOS"){
	$id_provinsi = $request['id_provinsi'];
	$id_kabupaten = $request['id_kabupaten'];
	$id_kecamatan = $request['id_kecamatan'];
	$id_kelurahan = $request['id_kelurahan'];
	$res = array();
	$res = db_select("SELECT DISTINCT(idpos) as kode_pos FROM `tb_wilayah` WHERE 
														provinsi='".$id_provinsi."' 
														and CONCAT(kota_kab,' ' ,nama_kota_kab)='".$id_kabupaten."' 
														and kec='".$id_kecamatan."' 
														and kel='".$id_kelurahan."' 
														ORDER BY kel ASC");
	echo json_encode($res);
}
else if($action == "loadDataExpense"){
	$data_user = $request['data_user'];
	$id_user = $data_user['id'];
	$created_by = $data_user['created_by'];
	$id_user_owner=($created_by == 1)?$id_user:$created_by;
/*
    [date_type] => by_month
	[date_type] => by_date
    [bulan] => 7
    [tahun] => 2019
    [tanggal_mulai] => 2019-07-01T15:01:22.979Z
    [tanggal_akhir] => 2019-07-31T15:01:22.979Z
*/	
	$res = array();
	$where_filter = "";
	if(isset($request['data_filter']) and $request['data_filter'] != null and $request['data_filter'] != ""){
		$data_filter = $request['data_filter'];
		if($data_filter['date_type'] == "by_month"){
			$where_filter = " and EXTRACT(YEAR_MONTH FROM tanggal) = '".$data_filter['tahun'].str_pad($data_filter['bulan'],2,"0",STR_PAD_LEFT)."' ";
		}else if($data_filter['date_type'] == "by_date"){
			$where_filter = " and ( tanggal between '".explode('T',$data_filter['tanggal_mulai'])[0]."' and '".explode('T',$data_filter['tanggal_akhir'])[0]."') ";
		}
	}
	$res = db_select("SELECT * FROM `tb_expense` 
								where 
									hapus='0' 
									and id_user_owner = '".$id_user_owner."' 
									".$where_filter."
								ORDER BY `id` DESC;");
	echo json_encode($res);
}
else if($action == "addExpense"){
	$data_user = $request['data_user'];
	$id_user = $data_user['id'];
	$created_by = $data_user['created_by'];
	$id_user_owner=($created_by == 1)?$id_user:$created_by;
	
	$data_expense = $request['data_expense'];
	$result = db_insert("INSERT INTO `tb_expense` SET
							tanggal = '".$data_expense['tanggal']."',
							nama_pengeluaran = '".$data_expense['nama_pengeluaran']."',
							biaya = '".$data_expense['biaya']."',
							jumlah = '".$data_expense['jumlah']."',
							sub_total = '".($data_expense['biaya']*$data_expense['jumlah'])."',
							keterangan = '".@$data_expense['keterangan']."',
							aktif = '".$data_expense['aktif']."',
							id_user_owner = '".$id_user_owner."',
							created_by = '".$id_user."'
					;");
	
	$return['result'] = $result;
	$return['message'] = "Anda berhasil menambah expense!";
	echo json_encode($return);
}
else if($action == "updateExpense"){
	$data_user = $request['data_user'];
	$id_user = $data_user['id'];
	$created_by = $data_user['created_by'];
	$id_user_owner=($created_by == 1)?$id_user:$created_by;
	
	$data_expense = $request['data_expense'];
	$result = db_exec("UPDATE `tb_expense` SET 
											tanggal = '".$data_expense['tanggal']."',
											nama_pengeluaran = '".$data_expense['nama_pengeluaran']."',
											biaya = '".$data_expense['biaya']."',
											jumlah = '".$data_expense['jumlah']."',
											sub_total = '".($data_expense['biaya']*$data_expense['jumlah'])."',
											keterangan = '".$data_expense['keterangan']."',
											aktif = '".$data_expense['aktif']."',
											updated_by = '".$id_user."'
										WHERE
											id = '".$data_expense['id']."'
										;");
	$return['result'] = $result;
	$return['message'] = "Anda berhasil update expense!";
	echo json_encode($return);
}
else if($action == "deleteExpense"){
	$id_expense = $request['id_expense'];
		db_exec("UPDATE `tb_expense` SET hapus='1'  where id = '".$id_expense."' ;");
		$return['result'] = "1";
		$return['message'] = "";
	echo json_encode($return);
}
else if($action == "cekProdukNamaBarang"){
	$data_user = $request['data_user'];
	$id_user = $data_user['id'];
	$created_by = $data_user['created_by'];
	$id_user_owner=($created_by == 1)?$id_user:$created_by;
	$res = array();
	$where_filter = "";
	if(isset($request['data_filter']) and $request['data_filter'] != null and $request['data_filter'] != ""){
		$data_filter = $request['data_filter'];
		if($data_filter['nama_barang']){
			$where_filter = " and a.nama_barang like '%".$data_filter['nama_barang']."%' and a.aktif = '".$data_filter['aktif']."' ";
		}
	}
	$res = db_select("SELECT a.* FROM `tb_produk` a
								where 
									a.hapus='0' 
									and a.id_user_owner = '".$id_user_owner."' 
									".$where_filter."
								LIMIT 3
								;");
	echo json_encode($res);
}
else if($action == "getProdukGrosir"){
	$data_user = $request['data_user'];
	$id_user = $data_user['id'];
	$created_by = $data_user['created_by'];
	$id_user_owner=($created_by == 1)?$id_user:$created_by;
	$res = array();
	$where_filter = "";
	if(isset($request['data_filter']) and $request['data_filter'] != null and $request['data_filter'] != ""){
		$data_filter = $request['data_filter'];
		if($data_filter['id_produk']){
			$where_filter = " and a.id_produk = '".$data_filter['id_produk']."' ";
		}
	}
	$res = db_select("SELECT a.* FROM `tb_produk_grosir` a
								where 
									a.hapus='0' 
									and a.id_user_owner = '".$id_user_owner."' 
									".$where_filter."
								;");
	echo json_encode($res);
}
else if($action == "getProductByName"){
	$data_user = $request['data_user'];
	$id_user = $data_user['id'];
	$created_by = $data_user['created_by'];
	$id_user_owner=($created_by == 1)?$id_user:$created_by;
	$res = array();
	$where_filter = "";
	if(isset($request['data_filter']) and $request['data_filter'] != null and $request['data_filter'] != ""){
		$data_filter = $request['data_filter'];
		if($data_filter['nama_barang']){
			$where_filter = " and a.nama_barang like '%".$data_filter['nama_barang']."%' and a.aktif = '".$data_filter['aktif']."' ";
		}
	}
	$res = db_select("SELECT a.*, b.*, b.id as id_varian, c.id_kabupaten as pengirim_produk_kota 
								FROM `tb_produk` a
								INNER JOIN tb_produk_varian b ON b.id_produk = a.id
								LEFT JOIN tb_suplier c ON c.id = a.id_suplier
								where 
									a.hapus='0' 
									and a.id_user_owner = '".$id_user_owner."' 
									".$where_filter."
								GROUP BY b.id_produk, b.harga_jual, b.nama_varian 
								LIMIT 5
								;");
	echo json_encode($res);
}
else if($action == "loadDataProduk"){
	$data_user = $request['data_user'];
	$id_user = $data_user['id'];
	$created_by = $data_user['created_by'];
	$id_user_owner=($created_by == 1)?$id_user:$created_by;
	$res = array();
	$where_filter = "";
	if(isset($request['data_filter']) and $request['data_filter'] != null and $request['data_filter'] != ""){
		$data_filter = $request['data_filter'];
		if($data_filter['id_kategori']){
			$where_filter = " and a.id_kategori = '".$data_filter['id_kategori']."' ";
		}
	}
	$res = db_select("SELECT a.*, b.kode as kode_kategori, b.nama as nama_kategori, c.*, d.nama as nama_suplier FROM `tb_produk` a
								LEFT JOIN tb_kategori b ON b.id = a.id_kategori
								LEFT JOIN tb_produk_varian c ON c.id_produk = a.id
								LEFT JOIN tb_suplier d ON d.id = a.id_suplier
								where 
									a.hapus='0' 
									and a.id_user_owner = '".$id_user_owner."' 
									".$where_filter."
								GROUP BY a.`id`
								ORDER BY a.`id` DESC
								;");
	
	foreach($res['data'] as $key => $val){
		$data_varian = db_select("SELECT * FROM `tb_produk_varian` WHERE id_produk = '".$val['id_produk']."'; ");
		$res['data'][$key]['data_varian'] = $data_varian['data'];
		
		$data_grosir = db_select("SELECT * FROM `tb_produk_grosir` WHERE id_produk = '".$val['id_produk']."'; ");
		$res['data'][$key]['data_grosir'] = $data_grosir['data'];
		
		foreach($res['data'][$key] as $key1 => $val1){
			if(is_string($val1)){
				$res['data'][$key][$key1] = utf8_encode($val1);
			}
		}
		
	}
	
	echo json_encode($res);
}
else if($action == "addProduk"){
	$data_user = $request['data_user'];
	$id_user = $data_user['id'];
	$created_by = $data_user['created_by'];
	$id_user_owner=($created_by == 1)?$id_user:$created_by;
	
	$data_produk = $request['data_produk'];
	$data_produk = ar_str_safe($data_produk);
	$query = "INSERT INTO `tb_produk` SET
								id_suplier = '".((isset($data_produk['id_suplier']))?$data_produk['id_suplier']:"")."',
								pengirim_produk = '".@$data_produk['pengirim_produk']."',
								nama_barang = '".$data_produk['nama_barang']."',
								sumber_stok = '".$data_produk['sumber_stok']."',
								id_kategori = '".$data_produk['id_kategori']."',
								deskripsi = '".$data_produk['deskripsi']."',
								stat_varian = '".((@$data_produk['stat_varian'] === true)?1:0)."',
								stat_habis = '".((@$data_produk['stat_habis'] === true)?1:0)."',
								stat_grosir_qty = '".((@$data_produk['grosir_qty'] === true)?1:0)."',
								aktif = '".$data_produk['aktif']."',
								id_user_owner = '".$id_user_owner."',
								created_by = '".$id_user."'
					;";
	//echo $query; die();
	$id_produk = db_insert($query);
	if(is_numeric($id_produk) and count($data_produk['data_varian']) >0 ){
		foreach($data_produk['data_varian'] as $varian){
			if(@$data_produk['stat_varian'] !== true){
				$varian['nama_varian'] = "";
			}
			if($data_produk['pengirim_produk'] == "pribadi"){
				$varian['stok_status'] = "";
			}
			if($data_produk['pengirim_produk'] == "suplier"){
				$varian['stok'] = "0";
			}
			$foto_name = "";
			if(isset($varian['foto_file']) and $varian['foto_file'] != ""){
				$new_image_name = date("Ymdhisa")."-".md5(uniqid())."-".str_replace("\\","-",str_replace("/","-",str_replace(" ","-",$data_produk['nama_barang'])));
				$ext = upload_data_to_image($varian['foto_file'],$new_image_name,null,'../assets/upload/produk/');
				$foto_name = $new_image_name.$ext;
			}
			/*
			kode = '".$varian['kode']."',
			*/
			$id_produk_varian = db_insert("INSERT INTO `tb_produk_varian` SET
												id_produk = '".$id_produk."',
												foto = '".$foto_name."',
												stat_hanya_foto = '".((@$varian['stat_hanya_foto'] === true)?1:0)."',
												berat = '".$varian['berat']."',
												harga_beli = '".$varian['harga_beli']."',
												harga_jual = '".$varian['harga_jual']."',
												diskon = '".$varian['diskon']."',
												diskon_tipe = '".@$data_produk['diskon_tipe']."',
												nama_varian = '".$varian['nama_varian']."',
												stok = '".$varian['stok']."',
												stok_status = '".$varian['stok_status']."',
												aktif = '".$data_produk['aktif']."',
												id_user_owner = '".$id_user_owner."',
												created_by = '".$id_user."'
							;");
		}
	}
	if(@$data_produk['grosir_qty'] === true and count($data_produk['data_grosir']) >0){
		foreach($data_produk['data_grosir'] as $grosir){
			if(@$grosir['harga_satuan'] > 0 and @$grosir['rentang_mulai'] > 0){
				$id_produk_grosir = db_insert("INSERT INTO `tb_produk_grosir` SET
															id_produk = '".$id_produk."',
															qty_awal = '".@$grosir['rentang_mulai']."',
															qty_akhir = '".@$grosir['rentang_akhir']."',
															harga_jual = '".@$grosir['harga_satuan']."',
															aktif = '".$data_produk['aktif']."',
															id_user_owner = '".$id_user_owner."',
															created_by = '".$id_user."'
								;");
			}
		}
	}
	
	$return['result'] = $id_produk;
	$return['message'] = "Anda berhasil menambah produk!";
	echo json_encode($return);
}
else if($action == "updateProduk"){
	$data_user = $request['data_user'];
	$id_user = $data_user['id'];
	$created_by = $data_user['created_by'];
	$id_user_owner=($created_by == 1)?$id_user:$created_by;
	
	$data_produk = $request['data_produk'];
	$data_produk = ar_str_safe($data_produk);
	$result = db_exec("UPDATE `tb_produk` SET 
											id_suplier = '".((isset($data_produk['id_suplier']))?$data_produk['id_suplier']:"")."',
											pengirim_produk = '".@$data_produk['pengirim_produk']."',
											nama_barang = '".$data_produk['nama_barang']."',
											sumber_stok = '".$data_produk['sumber_stok']."',
											id_kategori = '".$data_produk['id_kategori']."',
											deskripsi = '".$data_produk['deskripsi']."',
											stat_varian = '".((@$data_produk['stat_varian'] === true)?1:0)."',
											stat_habis = '".((@$data_produk['stat_habis'] === true)?1:0)."',
											stat_grosir_qty = '".((@$data_produk['grosir_qty'] === true)?1:0)."',
											aktif = '".$data_produk['aktif']."',
											updated_by = '".$id_user."'
										WHERE
											id = '".$data_produk['id_produk']."'
										;");
	$id_produk = $data_produk['id_produk'];
	db_exec("DELETE FROM `tb_produk_varian` where id_produk = '".$id_produk."' ;");
	if(is_numeric($id_produk) and count($data_produk['data_varian']) >0 ){
		foreach($data_produk['data_varian'] as $varian){
			if(@$data_produk['stat_varian'] !== true){
				$varian['nama_varian'] = "";
			}
			if($data_produk['pengirim_produk'] == "pribadi"){
				$varian['stok_status'] = "";
			}
			if($data_produk['pengirim_produk'] == "suplier"){
				$varian['stok'] = "0";
			}
			$foto_name = @$varian['foto'];
			if(isset($varian['foto_file']) and $varian['foto_file'] != ""){
				$new_image_name = date("Ymdhisa")."-".md5(uniqid())."-".str_replace("\\","-",str_replace("/","-",str_replace(" ","-",$data_produk['nama_barang'])));
				$ext = upload_data_to_image($varian['foto_file'],$new_image_name,$foto_name,'../assets/upload/produk/');
				$foto_name = $new_image_name.$ext;
			}
			/*
			kode = '".$varian['kode']."',
			*/
			$id_produk_varian = db_insert("INSERT INTO `tb_produk_varian` SET
												id_produk = '".$id_produk."',
												foto = '".$foto_name."',
												stat_hanya_foto = '".((@$varian['stat_hanya_foto'] === true)?1:0)."',
												berat = '".$varian['berat']."',
												harga_beli = '".$varian['harga_beli']."',
												harga_jual = '".$varian['harga_jual']."',
												diskon = '".$varian['diskon']."',
												diskon_tipe = '".@$data_produk['diskon_tipe']."',
												nama_varian = '".$varian['nama_varian']."',
												stok = '".$varian['stok']."',
												stok_status = '".$varian['stok_status']."',
												aktif = '".$data_produk['aktif']."',
												id_user_owner = '".$id_user_owner."',
												updated_by = '".$id_user."'
							;");
		}
	}
	db_exec("DELETE FROM `tb_produk_grosir` where id_produk = '".$id_produk."' ;");
	if(@$data_produk['grosir_qty'] === true and count($data_produk['data_grosir']) >0){
		foreach($data_produk['data_grosir'] as $grosir){
			if(@$grosir['harga_satuan'] > 0 and @$grosir['rentang_mulai'] > 0){
				$id_produk_grosir = db_insert("INSERT INTO `tb_produk_grosir` SET
															id_produk = '".$id_produk."',
															qty_awal = '".@$grosir['rentang_mulai']."',
															qty_akhir = '".@$grosir['rentang_akhir']."',
															harga_jual = '".@$grosir['harga_satuan']."',
															aktif = '".$data_produk['aktif']."',
															id_user_owner = '".$id_user_owner."',
															updated_by = '".$id_user."'
								;");
			}
		}
	}
	$return['result'] = $result;
	$return['message'] = "Anda berhasil update produk!";
	echo json_encode($return);
}
else if($action == "deleteProduk"){
	$id_produk = $request['id_produk'];
		db_exec("UPDATE `tb_produk` SET hapus='1' where id = '".$id_produk."' ;");
		db_exec("UPDATE `tb_produk_varian` SET hapus='1' where id_produk = '".$id_produk."' ;");
		db_exec("UPDATE `tb_produk_grosir` SET hapus='1' where id_produk = '".$id_produk."' ;");
		
		$folder_upload = '../assets/upload/produk/';
		$UPLOAD_DIR_ORI = $folder_upload.'original/';
		$UPLOAD_DIR_DISP = $folder_upload.'display/';
		$res = db_select("SELECT foto FROM `tb_produk_varian` where id_produk = '".$id_produk."' ;")['data'];
		
		if($res > 0){
			foreach($res as $row){
				if($row['foto'] != ""){
					@unlink($UPLOAD_DIR_ORI . $row['foto']);
					@unlink($UPLOAD_DIR_DISP . $row['foto']);
				}
			}
		}
		
		$return['result'] = "1";
		$return['message'] = "";
	echo json_encode($return);
}
else if($action == "loadQuickReportOrder"){
	$data_user = $request['data_user'];
	$id_user = $data_user['id'];
	$created_by = $data_user['created_by'];
	$id_user_owner=($created_by == 1)?$id_user:$created_by;
	$res = array();
	$where_filter = "";
	if(isset($request['data_filter']) and $request['data_filter'] != null and $request['data_filter'] != ""){
		$data_filter = $request['data_filter'];
		//print_r($data_filter);
		if(isset($data_filter['aktif'])){
			$where_filter .= " and a.aktif = '".$data_filter['aktif']."' ";
		}
		if(isset($data_filter['date_type']) and $data_filter['date_type'] == "by_month"){
			$where_filter .= " and EXTRACT(YEAR_MONTH FROM a.tanggal_order) = '".$data_filter['tahun'].str_pad($data_filter['bulan'], 2, "0", STR_PAD_LEFT)."' ";
		}
		if(isset($data_filter['date_type']) and $data_filter['date_type'] == "by_date"){
			$where_filter .= " and (DATE_FORMAT(a.tanggal_order,'%Y-%m-%d') >= DATE_FORMAT('".explode("T",$data_filter['tanggal_mulai'])[0]."','%Y-%m-%d') and DATE_FORMAT(a.tanggal_order,'%Y-%m-%d') <= DATE_FORMAT('".explode("T",$data_filter['tanggal_akhir'])[0]."','%Y-%m-%d')) ";
		}
	}
	$sql = "SELECT COUNT(*) as belum_bayar FROM `vw_order` a
								where 
									a.hapus='0' 
									and a.id_user_owner = '".$id_user_owner."' 
									and a.status_bayar = 'belum'
									".$where_filter."
								ORDER BY a.`id` DESC
								;";
	//echo $sql;
	$res['belum_bayar'] = db_select($sql)['data'][0]['belum_bayar'];

	$sql = "SELECT COUNT(*) as belum_diproses FROM `vw_order` a
								where 
									a.hapus='0' 
									and a.id_user_owner = '".$id_user_owner."' 
									and a.status_order = 'Preparation In Progress'
									".$where_filter."
								ORDER BY a.`id` DESC
								;";
	//echo $sql;
	$res['belum_diproses'] = db_select($sql)['data'][0]['belum_diproses'];
	
	$sql = "SELECT COUNT(*) as sedang_diproses FROM `vw_order` a
								where 
									a.hapus='0' 
									and a.id_user_owner = '".$id_user_owner."' 
									and a.status_order = 'On Process'
									".$where_filter."
								ORDER BY a.`id` DESC
								;";
	//echo $sql;
	$res['sedang_diproses'] = db_select($sql)['data'][0]['sedang_diproses'];
	
	$sql = "SELECT COUNT(*) as belum_ada_resi FROM `vw_order` a
								where 
									a.hapus='0' 
									and a.id_user_owner = '".$id_user_owner."' 
									and a.no_resi = ''
									".$where_filter."
								ORDER BY a.`id` DESC
								;";
	//echo $sql;
	$res['belum_ada_resi'] = db_select($sql)['data'][0]['belum_ada_resi'];
	
	$sql = "SELECT COUNT(*) as proses_pengiriman FROM `vw_order` a
								where 
									a.hapus='0' 
									and a.id_user_owner = '".$id_user_owner."' 
									and a.status_order = 'Shipping'
									".$where_filter."
								ORDER BY a.`id` DESC
								;";
	//echo $sql;
	$res['proses_pengiriman'] = db_select($sql)['data'][0]['proses_pengiriman'];

	$sql = "SELECT COUNT(*) as pengiriman_berhasil FROM `vw_order` a
								where 
									a.hapus='0' 
									and a.id_user_owner = '".$id_user_owner."' 
									and a.status_order = 'Delivered'
									".$where_filter."
								ORDER BY a.`id` DESC
								;";
	//echo $sql;
	$res['pengiriman_berhasil'] = db_select($sql)['data'][0]['pengiriman_berhasil'];
	
	echo json_encode($res);
}
else if($action == "loadDataOrder"){
	$data_user = $request['data_user'];
	$id_user = $data_user['id'];
	$created_by = $data_user['created_by'];
	$id_user_owner=($created_by == 1)?$id_user:$created_by;
	$res = array();
	$where_filter = "";
	if(isset($request['data_filter']) and $request['data_filter'] != null and $request['data_filter'] != ""){
		$data_filter = $request['data_filter'];
		//print_r($data_filter);
		if(isset($data_filter['aktif'])){
			$where_filter .= " and a.aktif = '".$data_filter['aktif']."' ";
		}
		if(isset($data_filter['date_type']) and $data_filter['date_type'] == "by_month"){
			$where_filter .= " and EXTRACT(YEAR_MONTH FROM a.tanggal_order) = '".$data_filter['tahun'].str_pad($data_filter['bulan'], 2, "0", STR_PAD_LEFT)."' ";
		}
		if(isset($data_filter['date_type']) and $data_filter['date_type'] == "by_date"){
			$where_filter .= " and (DATE_FORMAT(a.tanggal_order,'%Y-%m-%d') >= DATE_FORMAT('".explode("T",$data_filter['tanggal_mulai'])[0]."','%Y-%m-%d') and DATE_FORMAT(a.tanggal_order,'%Y-%m-%d') <= DATE_FORMAT('".explode("T",$data_filter['tanggal_akhir'])[0]."','%Y-%m-%d')) ";
		}
	}
	$sql = "SELECT a.*, b.no_telepon FROM `vw_order` a
						LEFT JOIN `tb_customer` b ON b.id = a.id_customer
								where 
									a.hapus='0' 
									and a.id_user_owner = '".$id_user_owner."' 
									".$where_filter."
								ORDER BY a.`id` DESC
								;";
	//echo $sql;
	$res = db_select($sql);
	echo json_encode($res);
}
else if($action == "loadDataOrderForUpdate"){
	$data_user = $request['data_user'];
	$id_user = $data_user['id'];
	$created_by = $data_user['created_by'];
	$id_user_owner=($created_by == 1)?$id_user:$created_by;
	$id_order = $request['id_order'];
	
	$res = array();
	$sql = "SELECT * FROM `tb_order` where id = '".$id_order."' ORDER BY id ASC;";
	$query_result = db_select($sql)['data'];
	
	
	$raw_cart = json_decode(base64_decode($query_result[0]['raw_cart']),true);
	foreach($raw_cart as $key => $val){
		$id_varian = $raw_cart[$key]['id_varian'];		
		$stok = db_select("SELECT stok FROM `tb_produk_varian` where id = '".$id_varian."' LIMIT 1;")['data'][0]['stok'];
		
		$raw_cart[$key]['stok'] = $raw_cart[$key]['cart_qty']+$stok;
	}
	$query_result[0]['raw_cart'] = base64_encode(json_encode($raw_cart));
	
	
	$res['tb_order'] = $query_result;
	
	/*
	$sql = "SELECT * FROM `tb_order_cart` where id_order = '".$id_order."' ORDER BY id ASC;";
	$res['tb_order_cart'] = db_select($sql)['data'];
	$sql = "SELECT * FROM `tb_order_cart_grosir` where id_order = '".$id_order."' ORDER BY id ASC;";
	$res['tb_order_cart_grosir'] = db_select($sql)['data'];
	$sql = "SELECT * FROM `tb_order_customer` where id_order = '".$id_order."' ORDER BY id ASC;";
	$res['tb_order_customer'] = db_select($sql)['data'];
	$sql = "SELECT * FROM `tb_order_suplier` where id_order = '".$id_order."' ORDER BY id ASC;";
	$res['tb_order_suplier'] = db_select($sql)['data'];
	*/
	echo json_encode($res);
}
else if($action == "loadDataOrderForPrint"){
	$data_user = $request['data_user'];
	$id_user = $data_user['id'];
	$created_by = $data_user['created_by'];
	$id_user_owner=($created_by == 1)?$id_user:$created_by;
	$id_order = $request['id_order'];
	$id_order_arr = array();
	if(is_array($id_order)){
		$id_order_arr = $id_order;
	}else{
		$id_order_arr[] = $id_order;
	}
	
	
	$sql = "
			SELECT a.* FROM `tb_profile_toko` a
			where 
				a.id_user_owner = '".$id_user_owner."' 
			ORDER BY a.id ASC;
			";
	$query_profile_toko = db_select($sql)['data'][0];		
	$res = array();
	foreach($id_order_arr as $id_order){
		$subRes = array();
		$subRes['tb_profile_toko'] = $query_profile_toko;
		$sql = "SELECT * FROM `tb_order` where id = '".$id_order."' ORDER BY id ASC;";
		$subRes['tb_order'] = db_select($sql)['data'];
		$sql = "SELECT * FROM `tb_order_cart` where id_order = '".$id_order."' ORDER BY id ASC;";
		$subRes['tb_order_cart'] = db_select($sql)['data'];
		$sql = "SELECT * FROM `tb_order_cart_grosir` where id_order = '".$id_order."' ORDER BY id ASC;";
		$subRes['tb_order_cart_grosir'] = db_select($sql)['data'];
		$sql = "SELECT * FROM `tb_order_customer` where id_order = '".$id_order."' ORDER BY id ASC;";
		$subRes['tb_order_customer'] = db_select($sql)['data'];
		$sql = "SELECT * FROM `tb_order_suplier` where id_order = '".$id_order."' ORDER BY id ASC;";
		$subRes['tb_order_suplier'] = db_select($sql)['data'];
		$res[] = $subRes;
	}
	echo json_encode($res);
	
}
else if($action == "addOrder"){
	$data_user = $request['data_user'];
	$id_user = $data_user['id'];
	$created_by = $data_user['created_by'];
	$id_user_owner=($created_by == 1)?$id_user:$created_by;
	
	$form_order = $request['data_form_order'];
	$product_cart_suplier = $request['product_cart_suplier'];
	$product_cart = $request['product_cart'];
	
	$data_form_order = json_decode($form_order,true);
	$data_product_cart_suplier = json_decode($product_cart_suplier,true);
	$data_product_cart = json_decode($product_cart,true);
	
	//print_r($data_form_order);
	//print_r($data_product_cart_suplier);
	//print_r($data_product_cart);
	$data_product_cart_tmp = array();
	foreach($data_product_cart as $data_product_cart_row){
		if(
			isset($data_form_order['mode_input_barang']) 
			and $data_form_order['mode_input_barang'] === true
			and $data_product_cart_row['stat_new_produk'] === true
		){
				$data_product_cart_row = ar_str_safe($data_product_cart_row);
				$id_produk = db_insert("INSERT INTO `tb_produk` SET
											id_suplier = '',
											pengirim_produk = '".$data_product_cart_row['pengirim_produk']."',
											nama_barang = '".$data_product_cart_row['nama_barang']."',
											sumber_stok = '".$data_product_cart_row['sumber_stok']."',
											id_kategori = '',
											deskripsi = '".$data_product_cart_row['deskripsi']."',
											stat_varian = '".$data_product_cart_row['stat_varian']."',
											stat_grosir_qty = '".$data_product_cart_row['stat_grosir_qty']."',
											aktif = '".$data_product_cart_row['aktif']."',
											id_user_owner = '".$id_user_owner."',
											created_by = '".$id_user."'
								;");
				$data_product_cart_row['id_produk'] = $id_produk;
				$id_produk_varian = db_insert("INSERT INTO `tb_produk_varian` SET
													id_produk = '".$data_product_cart_row['id_produk']."',
													foto = '".$data_product_cart_row['foto']."',
													berat = '".$data_product_cart_row['cart_berat']."',
													harga_beli = '".$data_product_cart_row['harga_beli']."',
													harga_jual = '".$data_product_cart_row['cart_harga_jual']."',
													diskon = '".$data_product_cart_row['diskon']."',
													diskon_tipe = '".$data_product_cart_row['diskon_tipe']."',
													nama_varian = '".$data_product_cart_row['nama_varian']."',
													stok = '".$data_product_cart_row['stok']."',
													stok_status = '".$data_product_cart_row['stok_status']."',
													aktif = '".$data_product_cart_row['aktif']."',
													id_user_owner = '".$id_user_owner."',
													created_by = '".$id_user."'
								;");
				$data_product_cart_row['id_varian'] = $id_produk_varian;
		}
		$data_product_cart_row['stat_new_produk'] = false;
		$data_product_cart_tmp[] = $data_product_cart_row;
	}
	$product_cart = json_encode($data_product_cart_tmp);
	$data_product_cart = json_decode($product_cart,true);
	
	$res = db_select("select (count(id)+1) as count from tb_order where id_user_owner = '".$id_user_owner."';")['data'];
	
	$result['id_order'] = db_insert("INSERT INTO `tb_order` SET
									raw_order = '".base64_encode($form_order)."',
									raw_suplier = '".base64_encode($product_cart_suplier)."',
									raw_cart = '".base64_encode($product_cart)."',
									tanggal_order = '".$data_form_order['tanggal_order']."',
									keterangan = '".$data_form_order['keterangan']."',
									id_customer = '".@$data_form_order['id_customer']."',
									nama_pemesan = '".@$data_form_order['nama_pemesan']."',
									alamat_tujuan = '".@$data_form_order['alamat_tujuan']."',
									
									status_dropship = '".((@$data_form_order['status_dropship'] === true)?1:0)."',
									nama_pemesan_dropship = '".@$data_form_order['nama_pemesan_dropship']."',
									alamat_tujuan_dropship = '".@$data_form_order['alamat_tujuan_dropship']."',
									
									diskon_order_tipe = '".$data_form_order['diskon_order_tipe']."',
									diskon_order_input = '".$data_form_order['diskon_order_input']."',
									diskon_order_nilai = '".$data_form_order['diskon_order_nilai']."',
									status_order = '".$data_form_order['status_order']."',
									status_bayar = '".$data_form_order['status_bayar']."',
									no_resi = '".@$data_form_order['no_resi']."',
									transaksi_tagihan = '".@$data_form_order['transaksi_tagihan']."',
									transaksi_dibayar = '".@$data_form_order['transaksi_dibayar']."',
									transaksi_kembalian = '".@$data_form_order['transaksi_kembalian']."',
									no_urut_order = ".@$res[0]['count'].",
									aktif = '1',
									id_user_owner = '".$id_user_owner."',
									created_by = '".$id_user."'
					;");
	$id_order = $result['id_order'];
	foreach($data_product_cart as $data_product_cart_row){
		$data_product_cart_row = ar_str_safe($data_product_cart_row);
		$result['id_order_cart'][] = db_insert("INSERT INTO `tb_order_cart` SET
										id_order = '".$id_order."',
										id_suplier = '".$data_product_cart_row['id_suplier']."',
										pengirim_produk = '".$data_product_cart_row['pengirim_produk']."',
										nama_barang = '".$data_product_cart_row['nama_barang']."',
										sumber_stok = '".$data_product_cart_row['sumber_stok']."',
										id_kategori = '".$data_product_cart_row['id_kategori']."',
										deskripsi = '".$data_product_cart_row['deskripsi']."',
										stat_varian = '".$data_product_cart_row['stat_varian']."',
										stat_grosir_qty = '".$data_product_cart_row['stat_grosir_qty']."',
										id_produk = '".$data_product_cart_row['id_produk']."',
										foto = '".$data_product_cart_row['foto']."',
										kode = '".$data_product_cart_row['kode']."',
										berat = '".$data_product_cart_row['berat']."',
										harga_beli = '".$data_product_cart_row['harga_beli']."',
										harga_jual = '".$data_product_cart_row['harga_jual']."',
										diskon = '".$data_product_cart_row['diskon']."',
										diskon_tipe = '".$data_product_cart_row['diskon_tipe']."',
										nama_varian = '".$data_product_cart_row['nama_varian']."',
										stok = '".$data_product_cart_row['stok']."',
										stok_status = '".$data_product_cart_row['stok_status']."',
										id_varian = '".$data_product_cart_row['id_varian']."',
										pengirim_produk_kota = '".$data_product_cart_row['pengirim_produk_kota']."',
										cart_qty = '".$data_product_cart_row['cart_qty']."',
										cart_harga_jual = '".$data_product_cart_row['cart_harga_jual']."',
										cart_berat = '".$data_product_cart_row['cart_berat']."'
						;");
						
						if($data_product_cart_row['pengirim_produk'] == "pribadi"){
							db_exec("UPDATE `tb_produk_varian` 
											SET 
												stok = (stok - ".$data_product_cart_row['cart_qty'].")
											WHERE 
												id = '".$data_product_cart_row['id_varian']."' ;");
						}
						
						$data_grosir = $data_product_cart_row['harga_grosir'];
						if(isset($data_grosir) and is_array($data_grosir) and count($data_grosir) > 0){
							foreach($data_grosir as $data_grosir_row){
								$result['id_order_cart_grosir'][] = db_insert("INSERT INTO `tb_order_cart_grosir` SET
																id_order = '".$id_order."',
																id_grosir = '".$data_grosir_row['id']."',
																id_produk = '".$data_grosir_row['id_produk']."',
																qty_awal = '".$data_grosir_row['qty_awal']."',
																qty_akhir = '".$data_grosir_row['qty_akhir']."',
																harga_jual = '".$data_grosir_row['harga_jual']."'
												;");
							}
						}
	}

	
	$data_customer = $data_form_order['customer'];
	if(isset($data_customer) and is_array($data_customer) and count($data_customer) > 0){
		$result['id_order_customer'] = db_insert("INSERT INTO `tb_order_customer` SET
										id_order = '".$id_order."',
										id_customer = '".$data_customer['id']."',
										id_membership = '".$data_customer['id_membership']."',
										nama_lengkap = '".$data_customer['nama_lengkap']."',
										no_telepon = '".$data_customer['no_telepon']."',
										email = '".$data_customer['email']."',
										id_propinsi = '".$data_customer['id_propinsi']."',
										id_kabupaten = '".$data_customer['id_kabupaten']."',
										id_kecamatan = '".$data_customer['id_kecamatan']."',
										id_kelurahan = '".$data_customer['id_kelurahan']."',
										kode_pos = '".$data_customer['kode_pos']."',
										alamat_lengkap = '".$data_customer['alamat_lengkap']."',
										membership = '".$data_customer['membership']."',
										diskon_tipe = '".$data_customer['diskon_tipe']."',
										diskon_nilai = '".$data_customer['diskon_nilai']."'
						;");
	}
	$data_form_order_temp = $data_form_order['berat'];
	foreach($data_form_order_temp as $key => $val){
		$result['id_order_suplier'][] = db_insert("INSERT INTO `tb_order_suplier` SET
										id_order = '".$id_order."',
										id_suplier = '".json_decode($key,true)['pengirim_produk_id']."',
										id_suplier_gen_by_app = '".$key."',
										berat = '".$data_form_order['berat'][$key]."',
										expedisi = '".$data_form_order['expedisi'][$key]."',
										expedisi_service = '".$data_form_order['expedisi_service'][$key]."',
										biaya_kirim = '".$data_form_order['biaya_kirim'][$key]."',
										total_ongkir = '".$data_form_order['total_ongkir'][$key]."',
										id_customer = '".@$data_customer['id']."'
						;");
	}
	
	$return['result'] = $result;
	$return['message'] = "Anda berhasil menambah Order!";
	
	echo json_encode($return);
}
else if($action == "updateOrder"){
	//d($request);
	$data_user = $request['data_user'];
	$id_user = $data_user['id'];
	$created_by = $data_user['created_by'];
	$id_user_owner=($created_by == 1)?$id_user:$created_by;
	
	$form_order = $request['data_form_order'];
	$product_cart_suplier = $request['product_cart_suplier'];
	$product_cart = $request['product_cart'];
	
	$data_form_order = json_decode($form_order,true);
	$data_product_cart_suplier = json_decode($product_cart_suplier,true);
	$data_product_cart = json_decode($product_cart,true);
	
	$id_order = $data_form_order['id_order'];
	$res = db_select("SELECT * FROM `tb_order_cart` where id_order = '".$id_order."';")['data'];
	if($res > 0){
		foreach($res as $row){
			if($row['pengirim_produk'] == "pribadi"){
				db_exec("UPDATE `tb_produk_varian` 
						SET stok = (stok + ".$row['cart_qty'].")
						WHERE id = '".$row['id_varian']."' ;");
			}
		}
	}
	//db_exec("DELETE FROM `tb_order` WHERE id = '".$id_order."' ;");
	db_exec("DELETE FROM `tb_order_cart` WHERE id_order = '".$id_order."' ;");
	db_exec("DELETE FROM `tb_order_cart_grosir` WHERE id_order = '".$id_order."' ;");
	db_exec("DELETE FROM `tb_order_customer` WHERE id_order = '".$id_order."' ;");
	db_exec("DELETE FROM `tb_order_suplier` WHERE id_order = '".$id_order."' ;");
	
	
	
	$result['id_order'] = $id_order;
					db_exec("UPDATE `tb_order` SET
										raw_order = '".base64_encode($form_order)."',
										raw_suplier = '".base64_encode($product_cart_suplier)."',
										raw_cart = '".base64_encode($product_cart)."',
										tanggal_order = '".$data_form_order['tanggal_order']."',
										keterangan = '".$data_form_order['keterangan']."',
										id_customer = '".@$data_form_order['id_customer']."',
										nama_pemesan = '".@$data_form_order['nama_pemesan']."',
										alamat_tujuan = '".@$data_form_order['alamat_tujuan']."',
										
										status_dropship = '".((@$data_form_order['status_dropship'] === true)?1:0)."',
										nama_pemesan_dropship = '".@$data_form_order['nama_pemesan_dropship']."',
										alamat_tujuan_dropship = '".@$data_form_order['alamat_tujuan_dropship']."',
										
										diskon_order_tipe = '".$data_form_order['diskon_order_tipe']."',
										diskon_order_input = '".$data_form_order['diskon_order_input']."',
										diskon_order_nilai = '".$data_form_order['diskon_order_nilai']."',
										status_order = '".$data_form_order['status_order']."',
										status_bayar = '".$data_form_order['status_bayar']."',
										no_resi = '".@$data_form_order['no_resi']."',
										transaksi_tagihan = '".@$data_form_order['transaksi_tagihan']."',
										transaksi_dibayar = '".@$data_form_order['transaksi_dibayar']."',
										transaksi_kembalian = '".@$data_form_order['transaksi_kembalian']."',
										aktif = '1',
										updated_by = '".$id_user."'
									WHERE
										id = '".$id_order."'
					;");
	//$id_order = $result['id_order'];
	foreach($data_product_cart as $data_product_cart_row){
		$data_product_cart_row = ar_str_safe($data_product_cart_row);
		$result['id_order_cart'][] = db_insert("INSERT INTO `tb_order_cart` SET
										id_order = '".$id_order."',
										id_suplier = '".$data_product_cart_row['id_suplier']."',
										pengirim_produk = '".$data_product_cart_row['pengirim_produk']."',
										nama_barang = '".$data_product_cart_row['nama_barang']."',
										sumber_stok = '".$data_product_cart_row['sumber_stok']."',
										id_kategori = '".$data_product_cart_row['id_kategori']."',
										deskripsi = '".$data_product_cart_row['deskripsi']."',
										stat_varian = '".$data_product_cart_row['stat_varian']."',
										stat_grosir_qty = '".$data_product_cart_row['stat_grosir_qty']."',
										id_produk = '".$data_product_cart_row['id_produk']."',
										foto = '".$data_product_cart_row['foto']."',
										kode = '".$data_product_cart_row['kode']."',
										berat = '".$data_product_cart_row['berat']."',
										harga_beli = '".$data_product_cart_row['harga_beli']."',
										harga_jual = '".$data_product_cart_row['harga_jual']."',
										diskon = '".$data_product_cart_row['diskon']."',
										diskon_tipe = '".$data_product_cart_row['diskon_tipe']."',
										nama_varian = '".$data_product_cart_row['nama_varian']."',
										stok = '".$data_product_cart_row['stok']."',
										stok_status = '".$data_product_cart_row['stok_status']."',
										id_varian = '".$data_product_cart_row['id_varian']."',
										pengirim_produk_kota = '".$data_product_cart_row['pengirim_produk_kota']."',
										cart_qty = '".$data_product_cart_row['cart_qty']."',
										cart_harga_jual = '".$data_product_cart_row['cart_harga_jual']."',
										cart_berat = '".$data_product_cart_row['cart_berat']."'
						;");
						
						if($data_product_cart_row['pengirim_produk'] == "pribadi"){
							db_exec("UPDATE `tb_produk_varian` 
											SET 
												stok = (stok - ".$data_product_cart_row['cart_qty'].")
											WHERE 
												id = '".$data_product_cart_row['id_varian']."' ;");
						}
						
						$data_grosir = $data_product_cart_row['harga_grosir'];
						if(isset($data_grosir) and is_array($data_grosir) and count($data_grosir) > 0){
							foreach($data_grosir as $data_grosir_row){
								$result['id_order_cart_grosir'][] = db_insert("INSERT INTO `tb_order_cart_grosir` SET
																id_order = '".$id_order."',
																id_grosir = '".$data_grosir_row['id']."',
																id_produk = '".$data_grosir_row['id_produk']."',
																qty_awal = '".$data_grosir_row['qty_awal']."',
																qty_akhir = '".$data_grosir_row['qty_akhir']."',
																harga_jual = '".$data_grosir_row['harga_jual']."'
												;");
							}
						}
	}

	
	$data_customer = $data_form_order['customer'];
	if(isset($data_customer) and is_array($data_customer) and count($data_customer) > 0){
		$result['id_order_customer'] = db_insert("INSERT INTO `tb_order_customer` SET
										id_order = '".$id_order."',
										id_customer = '".$data_customer['id']."',
										id_membership = '".$data_customer['id_membership']."',
										nama_lengkap = '".$data_customer['nama_lengkap']."',
										no_telepon = '".$data_customer['no_telepon']."',
										email = '".$data_customer['email']."',
										id_propinsi = '".$data_customer['id_propinsi']."',
										id_kabupaten = '".$data_customer['id_kabupaten']."',
										id_kecamatan = '".$data_customer['id_kecamatan']."',
										id_kelurahan = '".$data_customer['id_kelurahan']."',
										kode_pos = '".$data_customer['kode_pos']."',
										alamat_lengkap = '".$data_customer['alamat_lengkap']."',
										membership = '".$data_customer['membership']."',
										diskon_tipe = '".$data_customer['diskon_tipe']."',
										diskon_nilai = '".$data_customer['diskon_nilai']."'
						;");
	}
	$data_form_order_temp = $data_form_order['berat'];
	foreach($data_form_order_temp as $key => $val){
		$result['id_order_suplier'][] = db_insert("INSERT INTO `tb_order_suplier` SET
										id_order = '".$id_order."',
										id_suplier = '".json_decode($key,true)['pengirim_produk_id']."',
										id_suplier_gen_by_app = '".$key."',
										berat = '".$data_form_order['berat'][$key]."',
										expedisi = '".$data_form_order['expedisi'][$key]."',
										expedisi_service = '".$data_form_order['expedisi_service'][$key]."',
										biaya_kirim = '".$data_form_order['biaya_kirim'][$key]."',
										total_ongkir = '".$data_form_order['total_ongkir'][$key]."',
										id_customer = '".@$data_customer['id']."'
						;");
	}
	
	$return['result'] = $result;
	$return['message'] = "Anda berhasil update Order!";
	
	echo json_encode($return);
}
else if($action == "deleteOrder"){
	$id_order = $request['id_order'];
		db_exec("UPDATE `tb_order` SET hapus='1'  where id = '".$id_order."' ;");
		//db_exec("UPDATE `tb_order_cart` SET hapus='1'  where id_order = '".$id_order."' ;");
		//db_exec("UPDATE `tb_order_cart_grosir` SET hapus='1'  where id_order = '".$id_order."' ;");
		//db_exec("UPDATE `tb_order_customer` SET hapus='1'  where id_order = '".$id_order."' ;");
		//db_exec("UPDATE `tb_order_suplier` SET hapus='1'  where id_order = '".$id_order."' ;");
		$res = db_select("SELECT * FROM `tb_order_cart` where id_order = '".$id_order."';")['data'];
		if($res > 0){
			foreach($res as $row){
				if($row['pengirim_produk'] == "pribadi"){
					db_exec("UPDATE `tb_produk_varian` 
							SET stok = (stok + ".$row['cart_qty'].")
							WHERE id = '".$row['id_varian']."' ;");
				}
			}
		}
		$return['result'] = "1";
		$return['message'] = "";
	echo json_encode($return);
}
else if($action == "updateResi"){
	$data_user = $request['data_user'];
	$id_user = $data_user['id'];
	$created_by = $data_user['created_by'];
	$id_user_owner=($created_by == 1)?$id_user:$created_by;
	
	$id_order = $request['id_order'];
	$no_resi = $request['no_resi'];
	
	
	$res = db_select("SELECT raw_order FROM `tb_order` where id = '".$id_order."';")['data'];
	if(isset($res[0])){
		$row = $res[0];
		$raw_order = $row['raw_order'];
		$arr_order = json_decode(base64_decode($raw_order),true);
		$arr_order['no_resi'] = $no_resi;
		$enc_order = base64_encode(json_encode($arr_order));
		
		$result = db_exec("UPDATE `tb_order` SET 
												raw_order = '".$enc_order."',
												no_resi = '".$no_resi."',
												updated_by = '".$id_user."'
											WHERE
												id = '".$id_order."'
											;");
		$return['result'] = $result;
		$return['message'] = "Anda berhasil update no resi!";
	}else{
		$return['result'] = "";
		$return['message'] = "Anda gagal update no resi!";		
	}
	echo json_encode($return);
}
else if($action == "updateStatusBayar"){
	$data_user = $request['data_user'];
	$id_user = $data_user['id'];
	$created_by = $data_user['created_by'];
	$id_user_owner=($created_by == 1)?$id_user:$created_by;
	
	$id_order = $request['id_order'];
	$status_bayar = $request['status_bayar'];
	
	
	$res = db_select("SELECT raw_order FROM `tb_order` where id = '".$id_order."';")['data'];
	if(isset($res[0])){
		$row = $res[0];
		$raw_order = $row['raw_order'];
		$arr_order = json_decode(base64_decode($raw_order),true);
		$arr_order['status_bayar'] = $status_bayar;
		$enc_order = base64_encode(json_encode($arr_order));
		
		$result = db_exec("UPDATE `tb_order` SET 
												raw_order = '".$enc_order."',
												status_bayar = '".$status_bayar."',
												updated_by = '".$id_user."'
											WHERE
												id = '".$id_order."'
											;");
		$return['result'] = $result;
		$return['message'] = "";
	}else{
		$return['result'] = "";
		$return['message'] = "Anda gagal update status bayar!";		
	}
	echo json_encode($return);
}

else if($action == "loadDataDashboard"){
	$data_user = $request['data_user'];
	$id_user = $data_user['id'];
	$created_by = $data_user['created_by'];
	$id_user_owner=($created_by == 1)?$id_user:$created_by;
	$res = array();
	$where_filter = "";
	if(isset($request['data_filter']) and $request['data_filter'] != null and $request['data_filter'] != ""){
		$data_filter = $request['data_filter'];
		//print_r($data_filter);
		if(isset($data_filter['aktif'])){
			$where_filter .= " and a.aktif = '".$data_filter['aktif']."' ";
		}
		if(isset($data_filter['date_type']) and $data_filter['date_type'] == "by_month"){
			$where_filter .= " and EXTRACT(YEAR_MONTH FROM a.tanggal_order) = '".$data_filter['tahun'].str_pad($data_filter['bulan'], 2, "0", STR_PAD_LEFT)."' ";
		}
		if(isset($data_filter['date_type']) and $data_filter['date_type'] == "by_date"){
			$where_filter .= " and (DATE_FORMAT(a.tanggal_order,'%Y-%m-%d') >= DATE_FORMAT('".explode("T",$data_filter['tanggal_mulai'])[0]."','%Y-%m-%d') and DATE_FORMAT(a.tanggal_order,'%Y-%m-%d') <= DATE_FORMAT('".explode("T",$data_filter['tanggal_akhir'])[0]."','%Y-%m-%d')) ";
		}
	}
	$sql = "SELECT COUNT(*) as total_order FROM `vw_order` a
								where 
									a.hapus='0' 
									and a.id_user_owner = '".$id_user_owner."' 
									".$where_filter."
								ORDER BY a.`id` DESC
								;";
	//echo $sql;
	$res['total_order'] = db_select($sql)['data'][0]['total_order'];

	$sql = "SELECT COUNT(*) as belum_diproses FROM `vw_order` a
								where 
									a.hapus='0' 
									and a.id_user_owner = '".$id_user_owner."' 
									and a.status_order = 'Preparation In Progress'
									".$where_filter."
								ORDER BY a.`id` DESC
								;";
	//echo $sql;
	$res['belum_diproses'] = db_select($sql)['data'][0]['belum_diproses'];
	
	$sql = "SELECT IFNULL(SUM(total_qty), 0) as terjual FROM `vw_order` a
								where 
									a.hapus='0' 
									and a.id_user_owner = '".$id_user_owner."' 
									and a.status_bayar = 'sudah'
									".$where_filter."
								ORDER BY a.`id` DESC
								;";
	//echo $sql;
	$res['terjual'] = db_select($sql)['data'][0]['terjual'];
	
	$sql = "SELECT IFNULL(SUM(total_bayar), 0) as omset FROM `vw_order` a
								where 
									a.hapus='0' 
									and a.id_user_owner = '".$id_user_owner."' 
									and a.status_bayar = 'sudah'
									".$where_filter."
								ORDER BY a.`id` DESC
								;";
	//echo $sql;
	$res['omset'] = db_select($sql)['data'][0]['omset'];

	
	if(isset($data_filter['date_type']) and $data_filter['date_type'] == "by_date" and explode("T",$data_filter['tanggal_mulai'])[0] == explode("T",$data_filter['tanggal_akhir'])[0]){
		$sql = "SELECT a.tanggal_order as waktu_order, DATE_FORMAT(a.tanggal_order,'%H:%i') as waktu_order_val, a.total_qty as total_qty, a.total_bayar as total_bayar FROM `vw_order` a
									where 
										a.hapus='0' 
										and a.id_user_owner = '".$id_user_owner."' 
										and a.status_bayar = 'sudah'
										".$where_filter."
									ORDER BY a.tanggal_order ASC
									;";
		//echo $sql;
	}else{
		$sql = "SELECT DATE_FORMAT(a.tanggal_order,'%Y-%m-%d') as waktu_order, DATE_FORMAT(a.tanggal_order,'%d/%m') as waktu_order_val, sum(a.total_qty) as total_qty, sum(a.total_bayar) as total_bayar FROM `vw_order` a
									where 
										a.hapus='0' 
										and a.id_user_owner = '".$id_user_owner."' 
										and a.status_bayar = 'sudah'
										".$where_filter."
									GROUP BY DATE_FORMAT(a.tanggal_order,'%Y-%m-%d')
									ORDER BY DATE_FORMAT(a.tanggal_order,'%Y-%m-%d') ASC
									;";
		//echo $sql;
	}
	$res['grafik_penjualan'] = db_select($sql)['data'];
	
	echo json_encode($res);
}
else if($action == "loadDataReport"){
	$data_user = $request['data_user'];
	$id_user = $data_user['id'];
	$created_by = $data_user['created_by'];
	$id_user_owner=($created_by == 1)?$id_user:$created_by;
	$res = array();
	$where_filter = "";
	$where_filter_ii = "";
	if(isset($request['data_filter']) and $request['data_filter'] != null and $request['data_filter'] != ""){
		$data_filter = $request['data_filter'];
		//print_r($data_filter);
		if(isset($data_filter['aktif'])){
			$where_filter .= $where_filter_ii .= " and a.aktif = '".$data_filter['aktif']."' ";
		}
		if(isset($data_filter['date_type']) and $data_filter['date_type'] == "by_month"){
			$where_filter .= " and EXTRACT(YEAR_MONTH FROM a.tanggal_order) = '".$data_filter['tahun'].str_pad($data_filter['bulan'], 2, "0", STR_PAD_LEFT)."' ";
			$where_filter_ii .= " and EXTRACT(YEAR_MONTH FROM a.tanggal_input) = '".$data_filter['tahun'].str_pad($data_filter['bulan'], 2, "0", STR_PAD_LEFT)."' ";
		}
		if(isset($data_filter['date_type']) and $data_filter['date_type'] == "by_date"){
			$where_filter .= " and (DATE_FORMAT(a.tanggal_order,'%Y-%m-%d') >= DATE_FORMAT('".explode("T",$data_filter['tanggal_mulai'])[0]."','%Y-%m-%d') and DATE_FORMAT(a.tanggal_order,'%Y-%m-%d') <= DATE_FORMAT('".explode("T",$data_filter['tanggal_akhir'])[0]."','%Y-%m-%d')) ";
			$where_filter_ii .= " and (DATE_FORMAT(a.tanggal_input,'%Y-%m-%d') >= DATE_FORMAT('".explode("T",$data_filter['tanggal_mulai'])[0]."','%Y-%m-%d') and DATE_FORMAT(a.tanggal_input,'%Y-%m-%d') <= DATE_FORMAT('".explode("T",$data_filter['tanggal_akhir'])[0]."','%Y-%m-%d')) ";
		}
	}
	$sql = "SELECT IFNULL(SUM((total_bayar-total_ongkir)), 0) as total_penjualan FROM `vw_order` a
								where 
									a.hapus='0' 
									and a.id_user_owner = '".$id_user_owner."' 
									".$where_filter."
								ORDER BY a.`id` DESC
								;";
	//echo $sql;
	$res['total_penjualan'] = db_select($sql)['data'][0]['total_penjualan'];
	
	
	$sql = "SELECT IFNULL(SUM((b.harga_beli*b.cart_qty)), 0) as total_nilai_produk FROM `vw_order` a
								INNER JOIN `vw_order_cart` b ON  b.`id_order` = a.`id`
								where 
									a.hapus='0' 
									and a.id_user_owner = '".$id_user_owner."' 
									".$where_filter."
								ORDER BY a.`id` DESC
								;";
	//echo $sql;
	$res['total_nilai_produk'] = db_select($sql)['data'][0]['total_nilai_produk'];
	
	$sql = "SELECT IFNULL(SUM((total_ongkir)), 0) as total_ongkir FROM `vw_order` a
								where 
									a.hapus='0' 
									and a.id_user_owner = '".$id_user_owner."' 
									".$where_filter."
								ORDER BY a.`id` DESC
								;";
	//echo $sql;
	$res['total_ongkir'] = db_select($sql)['data'][0]['total_ongkir'];
	
	$sql = "SELECT IFNULL(SUM((diskon_order+diskon_member)), 0) as total_diskon FROM `vw_order` a
								where 
									a.hapus='0' 
									and a.id_user_owner = '".$id_user_owner."' 
									".$where_filter."
								ORDER BY a.`id` DESC
								;";
	//echo $sql;
	$res['total_diskon'] = db_select($sql)['data'][0]['total_diskon'];
	
	$sql = "SELECT COUNT(*) as jumlah_order FROM `vw_order` a
								where 
									a.hapus='0' 
									and a.id_user_owner = '".$id_user_owner."' 
									".$where_filter."
								ORDER BY a.`id` DESC
								;";
	//echo $sql;
	$res['jumlah_order'] = db_select($sql)['data'][0]['jumlah_order'];
	
	$sql = "SELECT IFNULL(SUM((b.cart_qty)), 0)as jumlah_item_terjual FROM `vw_order` a
								INNER JOIN `vw_order_cart` b ON  b.`id_order` = a.`id`
								where 
									a.hapus='0' 
									and a.id_user_owner = '".$id_user_owner."' 
									".$where_filter."
								ORDER BY a.`id` DESC
								;";
	//echo $sql;
	$res['jumlah_item_terjual'] = db_select($sql)['data'][0]['jumlah_item_terjual'];
	
	$sql = "SELECT IFNULL(SUM((a.sub_total)), 0) as total_expense FROM `tb_expense` a
								where 
									a.hapus='0' 
									and a.id_user_owner = '".$id_user_owner."' 
									".$where_filter_ii."
								ORDER BY a.`id` DESC
								;";
	//echo $sql;
	$res['total_expense'] = db_select($sql)['data'][0]['total_expense'];
	
	if(isset($data_filter['date_type']) and $data_filter['date_type'] == "by_date" and explode("T",$data_filter['tanggal_mulai'])[0] == explode("T",$data_filter['tanggal_akhir'])[0]){
		$sql = "SELECT a.tanggal_order as waktu_order, DATE_FORMAT(a.tanggal_order,'%H:%i') as waktu_order_val, a.total_qty as total_qty, a.total_bayar as total_bayar FROM `vw_order` a
									where 
										a.hapus='0' 
										and a.id_user_owner = '".$id_user_owner."' 
										and a.status_bayar = 'sudah'
										".$where_filter."
									ORDER BY a.tanggal_order ASC
									;";
		//echo $sql;
	}else{
		$sql = "SELECT DATE_FORMAT(a.tanggal_order,'%Y-%m-%d') as waktu_order, DATE_FORMAT(a.tanggal_order,'%d/%m') as waktu_order_val, sum(a.total_qty) as total_qty, sum(a.total_bayar) as total_bayar FROM `vw_order` a
									where 
										a.hapus='0' 
										and a.id_user_owner = '".$id_user_owner."' 
										and a.status_bayar = 'sudah'
										".$where_filter."
									GROUP BY DATE_FORMAT(a.tanggal_order,'%Y-%m-%d')
									ORDER BY DATE_FORMAT(a.tanggal_order,'%Y-%m-%d') ASC
									;";
		//echo $sql;
	}
	$res['grafik_penjualan'] = db_select($sql)['data'];
	
	if(isset($data_filter['date_type']) and $data_filter['date_type'] == "by_date" and explode("T",$data_filter['tanggal_mulai'])[0] == explode("T",$data_filter['tanggal_akhir'])[0]){
		$sql = "SELECT 
					a.waktu_order,
					a.waktu_order_val,
					SUM(a.total_qty) as total_qty, 
					SUM(a.total_harga_jual) as total_harga_jual, 
					SUM(a.total_harga_beli) as total_harga_beli, 
					SUM(a.total_keuntungan) as total_keuntungan
				FROM `vw_order_n_detail` a
				WHERE 
					a.hapus='0' 
					and a.id_user_owner = '".$id_user_owner."' 
					and a.status_bayar = 'sudah'
					".$where_filter."
				ORDER BY a.tanggal_order ASC
				;";
		//echo $sql;
	}else{
		$sql = "SELECT 					
					a.waktu_order,
					a.waktu_order_val,
					SUM(a.total_qty) as total_qty, 
					SUM(a.total_harga_jual) as total_harga_jual, 
					SUM(a.total_harga_beli) as total_harga_beli, 
					SUM(a.total_keuntungan) as total_keuntungan
				FROM `vw_order_n_detail` a
				WHERE 
					a.hapus='0' 
					and a.id_user_owner = '".$id_user_owner."' 
					and a.status_bayar = 'sudah'
					".$where_filter."
				GROUP BY DATE_FORMAT(a.tanggal_order,'%Y-%m-%d')
				ORDER BY DATE_FORMAT(a.tanggal_order,'%Y-%m-%d') ASC
				;";
		//echo $sql;
	}
	$res['grafik_keuntungan'] = db_select($sql)['data'];
	
	echo json_encode($res);
}

else if($action == "loadDataReportGenerate"){
	$data_user = $request['data_user'];
	$id_user = $data_user['id'];
	$created_by = $data_user['created_by'];
	$id_user_owner=($created_by == 1)?$id_user:$created_by;
	$res = array();
	$where_filter = "";
	if(isset($request['data_filter']) and $request['data_filter'] != null and $request['data_filter'] != ""){
		$data_filter = $request['data_filter'];
		//print_r($data_filter);
		if(isset($data_filter['aktif'])){
			$where_filter .= " and a.aktif = '".$data_filter['aktif']."' ";
		}
		if(isset($data_filter['date_type']) and $data_filter['date_type'] == "by_month"){
			$where_filter .= " and EXTRACT(YEAR_MONTH FROM a.tanggal_order) = '".$data_filter['tahun'].str_pad($data_filter['bulan'], 2, "0", STR_PAD_LEFT)."' ";
		}
		if(isset($data_filter['date_type']) and $data_filter['date_type'] == "by_date"){
			$where_filter .= " and (DATE_FORMAT(a.tanggal_order,'%Y-%m-%d') >= DATE_FORMAT('".explode("T",$data_filter['tanggal_mulai'])[0]."','%Y-%m-%d') and DATE_FORMAT(a.tanggal_order,'%Y-%m-%d') <= DATE_FORMAT('".explode("T",$data_filter['tanggal_akhir'])[0]."','%Y-%m-%d')) ";
		}
	}
	
	$sql = "SELECT * FROM `vw_order_n_detail` a
								where 
									a.hapus='0' 
									and a.id_user_owner = '".$id_user_owner."' 
									".$where_filter."
								ORDER BY a.tanggal_order ASC
								;";
	$res = db_select($sql);

	echo json_encode($res);
}
else if($action == "loadDataReportAnalysist"){
	$data_user = $request['data_user'];
	$id_user = $data_user['id'];
	$created_by = $data_user['created_by'];
	$id_user_owner=($created_by == 1)?$id_user:$created_by;
	$res = array();
	$where_filter = "";
	if(isset($request['data_filter']) and $request['data_filter'] != null and $request['data_filter'] != ""){
		$data_filter = $request['data_filter'];
		//print_r($data_filter);
		if(isset($data_filter['aktif'])){
			$where_filter .= " and a.aktif = '".$data_filter['aktif']."' ";
		}
		if(isset($data_filter['date_type']) and $data_filter['date_type'] == "by_month"){
			$where_filter .= " and EXTRACT(YEAR_MONTH FROM a.tanggal_order) = '".$data_filter['tahun'].str_pad($data_filter['bulan'], 2, "0", STR_PAD_LEFT)."' ";
		}
		if(isset($data_filter['date_type']) and $data_filter['date_type'] == "by_date"){
			$where_filter .= " and (DATE_FORMAT(a.tanggal_order,'%Y-%m-%d') >= DATE_FORMAT('".explode("T",$data_filter['tanggal_mulai'])[0]."','%Y-%m-%d') and DATE_FORMAT(a.tanggal_order,'%Y-%m-%d') <= DATE_FORMAT('".explode("T",$data_filter['tanggal_akhir'])[0]."','%Y-%m-%d')) ";
		}
	}
	
	
	$sql = "SELECT b.nama_lengkap, a.created_by, COUNT(a.created_by) as count 
								FROM vw_order_n_detail a
								INNER JOIN app_user b ON b.id = a.created_by
								WHERE 
									a.hapus='0' 
									and a.id_user_owner = '".$id_user_owner."' 
									".$where_filter."
								GROUP BY a.created_by
								ORDER BY COUNT(a.created_by) DESC
								;";
	//echo $sql;
	$res['best_seller'] = db_select($sql)['data'];
	
	$sql = "SELECT a.nama_pemesan, a.id_customer, COUNT(a.id_customer) as count 
								FROM vw_order_n_detail a
								WHERE 
									a.hapus='0' 
									and a.id_user_owner = '".$id_user_owner."' 
									and a.id_customer != ''
									".$where_filter."
								GROUP BY a.id_customer
								ORDER BY COUNT(a.id_customer) DESC
								;";
	//echo $sql;
	$res['best_customer'] = db_select($sql)['data'];
	
	$sql = "SELECT b.id_propinsi, b.id_kabupaten, CONCAT(b.id_propinsi,' ',b.id_kabupaten) as wilayah, COUNT(*) as count 
								FROM vw_order_n_detail a
								INNER JOIN tb_customer b ON b.id = a.id_customer
								WHERE 
									a.hapus='0' 
									and a.id_user_owner = '".$id_user_owner."' 
									".$where_filter."
								GROUP BY b.id_propinsi, b.id_kabupaten
								ORDER BY COUNT(*) DESC
								;";
	//echo $sql;
	$res['best_location'] = db_select($sql)['data'];
	
	$sql = "SELECT b.nama_produk, b.id_produk, COUNT(b.id_produk) as count 
								FROM vw_order a
								INNER JOIN vw_order_cart b ON b.id_order = a.id
								WHERE 
									a.hapus='0' 
									and a.id_user_owner = '".$id_user_owner."' 
									".$where_filter."
								GROUP BY b.id_produk
								ORDER BY COUNT(b.id_produk) DESC
								;";
	//echo $sql;
	$res['best_product'] = db_select($sql)['data'];

	if(isset($data_filter['date_type']) and $data_filter['date_type'] == "by_date" and explode("T",$data_filter['tanggal_mulai'])[0] == explode("T",$data_filter['tanggal_akhir'])[0]){
		$sql = "SELECT a.tanggal_order as waktu_order, DATE_FORMAT(a.tanggal_order,'%H:%i') as waktu_order_val, a.total_qty as total_qty, a.total_bayar as total_bayar FROM `vw_order` a
									where 
										a.hapus='0' 
										and a.id_user_owner = '".$id_user_owner."' 
										and a.status_bayar = 'sudah'
										".$where_filter."
									ORDER BY a.tanggal_order ASC
									;";
		//echo $sql;
	}else{
		$sql = "SELECT DATE_FORMAT(a.tanggal_order,'%Y-%m-%d') as waktu_order, DATE_FORMAT(a.tanggal_order,'%d/%m') as waktu_order_val, sum(a.total_qty) as total_qty, sum(a.total_bayar) as total_bayar FROM `vw_order` a
									where 
										a.hapus='0' 
										and a.id_user_owner = '".$id_user_owner."' 
										and a.status_bayar = 'sudah'
										".$where_filter."
									GROUP BY DATE_FORMAT(a.tanggal_order,'%Y-%m-%d')
									ORDER BY DATE_FORMAT(a.tanggal_order,'%Y-%m-%d') ASC
									;";
		//echo $sql;
	}
	$res['grafik_penjualan'] = db_select($sql)['data'];
	/*
	best_seller
	best_customer
	best_location
	best_product
	*/	

	echo json_encode($res);
}
else if($action == "loadDataAffiliasi"){
	$data_user = $request['data_user'];
	$id_user = $data_user['id'];
	$created_by = $data_user['created_by'];
	$id_user_owner=($created_by == 1)?$id_user:$created_by;
	$res = array();
	$where_filter = "";
	if(isset($request['data_filter']) and $request['data_filter'] != null and $request['data_filter'] != ""){
		$data_filter = $request['data_filter'];
		//print_r($data_filter);
		if(isset($data_filter['aktif'])){
			$where_filter .= " and a.aktif = '".$data_filter['aktif']."' ";
		}
		if(isset($data_filter['date_type']) and $data_filter['date_type'] == "by_month"){
			$where_filter .= " and EXTRACT(YEAR_MONTH FROM a.tanggal_input) = '".$data_filter['tahun'].str_pad($data_filter['bulan'], 2, "0", STR_PAD_LEFT)."' ";
		}
		if(isset($data_filter['date_type']) and $data_filter['date_type'] == "by_date"){
			$where_filter .= " and (DATE_FORMAT(a.tanggal_input,'%Y-%m-%d') >= DATE_FORMAT('".explode("T",$data_filter['tanggal_mulai'])[0]."','%Y-%m-%d') and DATE_FORMAT(a.tanggal_input,'%Y-%m-%d') <= DATE_FORMAT('".explode("T",$data_filter['tanggal_akhir'])[0]."','%Y-%m-%d')) ";
		}
	}
	
	
	$sql = "SELECT *
								FROM app_user a
								WHERE 
									a.hapus='0' 
									and a.reference_by_affiliate_code = '".$id_user_owner."' 
									".$where_filter."
								ORDER BY a.id DESC
								;";
	//echo $sql;
	$res = db_select($sql);
	
	echo json_encode($res);
}
else if($action == "sendChatTicket"){
	$data_user = $request['data_user'];
	$id_user = $data_user['id'];
	$created_by = $data_user['created_by'];
	$id_user_owner=($created_by == 1)?$id_user:$created_by;
	
	$data_form_support = $request['data_form_support'];
	
	if($data_form_support['id_user_penerima'] == "") $data_form_support['id_user_penerima'] = 1;
		
	$result = db_insert("INSERT INTO `tb_support_chat` SET
							kode_tiket = '".$data_form_support['kode_tiket']."',
							pengirim = '".$id_user."',
							penerima = '".$data_form_support['id_user_penerima']."',
							judul = '".$data_form_support['input_judul']."',
							pesan = '".$data_form_support['input_pesan']."',
							pembuat_pesan = '".$data_form_support['pembuat_pesan']."',
							
							id_user_owner = '".$id_user_owner."',
							created_by = '".$id_user."'
					;");
	
	$return['result'] = $result;
	$return['message'] = "Anda berhasil mengirim tiket!";
	echo json_encode($return);
}
else if($action == "loadHistoryChatTicket"){
	$data_user = $request['data_user'];
	$id_user = $data_user['id'];
	$created_by = $data_user['created_by'];
	$id_user_owner=($created_by == 1)?$id_user:$created_by;
	
	$data_support = $request['data_support'];
	
	$result = db_exec("
						UPDATE `tb_support_chat` SET 
							dibaca = '1'
						WHERE
							penerima = '".$id_user."'
							AND kode_tiket = '".$data_support['kode_tiket_aktif']."' 
					");
										
	$res = db_select("
						SELECT a.*, b.nama_lengkap as nama_pengirim
							FROM tb_support_chat a
							INNER JOIN app_user b ON b.id = a.pengirim
						WHERE 
							(a.pengirim = '".$id_user."' OR a.penerima = '".$id_user."') 
							AND a.kode_tiket = '".$data_support['kode_tiket_aktif']."' 
							AND a.judul = '".$data_support['form']['input_judul']."' 
							AND a.hapus = '0' 
							AND a.aktif = '1' 
							ORDER BY a.id  ASC 
					");
	echo json_encode($res);
}
else if($action == "deleteChatTicket"){
	$data_user = $request['data_user'];
	$id_user = $data_user['id'];
	$created_by = $data_user['created_by'];
	$id_user_owner=($created_by == 1)?$id_user:$created_by;
	
	$id_chat_ticket = $request['id_chat_ticket'];
	
	$result = db_exec("UPDATE `tb_support_chat` SET 
											hapus = '1',
											updated_by = '".$id_user."'
										WHERE
											id = '".$id_chat_ticket."'
										;");
}
else if($action == "loadListTicket"){
	$data_user = $request['data_user'];
	$id_user = $data_user['id'];
	$created_by = $data_user['created_by'];
	$id_user_owner=($created_by == 1)?$id_user:$created_by;
	
	$data_support = $request['data_support'];
/*
	SELECT a.*, b.nama_lengkap as nama_pengirim
		FROM tb_support_chat a
		INNER JOIN app_user b ON b.id = a.pembuat_pesan
	WHERE 
		(a.pengirim = '".$id_user."' OR a.penerima = '".$id_user."') 
		AND a.hapus = '0'
		AND a.aktif = '1'
		GROUP BY a.kode_tiket, a.judul  
		ORDER BY a.id  DESC
		
	SELECT a.*, IFNULL(a2.dibaca,'1') as dibaca2, b.nama_lengkap as nama_pengirim
		FROM tb_support_chat a
		INNER JOIN app_user b ON b.id = a.pembuat_pesan
		LEFT JOIN tb_support_chat a2 on a2.kode_tiket = a.kode_tiket AND a2.dibaca = '0'
	WHERE 
		(a.pengirim = '".$id_user."' OR a.penerima = '".$id_user."') 
		AND a.hapus = '0'
		AND a.aktif = '1'
		GROUP BY a.kode_tiket, a.judul  
		ORDER BY a.id  DESC
		
*/	
	$res = db_select("
						SELECT a.*, IFNULL(a2.dibaca,'1') as dibaca2, (SELECT ta.penerima FROM tb_support_chat as ta WHERE ta.kode_tiket = a.kode_tiket ORDER BY ta.id DESC LIMIT 1) as penerima2, b.nama_lengkap as nama_pengirim
							FROM tb_support_chat a
							INNER JOIN app_user b ON b.id = a.pembuat_pesan
							LEFT JOIN tb_support_chat a2 on a2.kode_tiket = a.kode_tiket AND a2.dibaca = '0'
						WHERE 
							(a.pengirim = '".$id_user."' OR a.penerima = '".$id_user."') 
							AND a.hapus = '0'
							AND a.aktif = '1'
							GROUP BY a.kode_tiket, a.judul  
							ORDER BY a.id  DESC
					");
	echo json_encode($res);
}
else if($action == "loadNewTicketChat"){
	$data_user = $request['data_user'];
	$id_user = $data_user['id'];
	$created_by = $data_user['created_by'];
	$id_user_owner=($created_by == 1)?$id_user:$created_by;
	
	$res = db_select("
						SELECT COUNT(*) as jumlah_pesan_baru 
						FROM `tb_support_chat` 
						WHERE 
							penerima = '".$id_user."' 
							AND dibaca = '0'
					")['data'][0];
	echo json_encode($res);
}
else if($action == "viewMobileOrder"){
	$id_order = $request['id_order'];
	$res = array();
	$res['tb_order'] = db_select("SELECT * FROM `tb_order` WHERE `id` = '".$id_order."'");
	$res['tb_order_cart'] = db_select("SELECT * FROM `tb_order_cart` WHERE `id_order` = '".$id_order."'");
	$res['tb_order_cart_grosir'] = db_select("SELECT * FROM `tb_order_cart_grosir` WHERE `id_order` = '".$id_order."'");
	$res['tb_order_customer'] = db_select("SELECT * FROM `tb_order_customer` WHERE `id_order` = '".$id_order."'");
	$res['tb_order_suplier'] = db_select("SELECT * FROM `tb_order_suplier` WHERE `id_order` = '".$id_order."'");
	
	echo json_encode($res);
}
else if($action == "updateMobileOrder"){
	$id_user = $request['id_user'];
	$id_order = $request['id_order'];
	$status_order = $request['status_order'];
	$biaya_kirim = $request['biaya_kirim'];
	$total_ongkir = $request['total_ongkir'];
	
	$result['tb_order'] = db_exec("UPDATE `tb_order` SET 
										status_order = '".$status_order."',
										updated_by = '".$id_user."'
									WHERE
										id = '".$id_order."'
									;");
	
	$result['tb_order_suplier'] = db_exec("UPDATE `tb_order_suplier` SET 
										biaya_kirim = '".$biaya_kirim."',
										total_ongkir = '".$total_ongkir."'
									WHERE
										id_order = '".$id_order."'
									;");
	echo json_encode($result);
}
else{
	d($_REQUEST);
	d($_FILES);
}
?>