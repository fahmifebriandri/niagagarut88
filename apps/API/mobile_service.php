<?php
require_once("config.php");
require_once("library_function.php");
/*
db_select
db_insert
db_exec
*/

//$request = json_decode(base64_decode($_REQUEST['data_param']),true);
$action = $_REQUEST['action'];
$id_user_owner = "101";

if($action == "get_home_data"){
	$res = array();
	$res['kategori'] = db_select("SELECT * FROM `tb_kategori` WHERE hapus = '0' and id_user_owner = ".$id_user_owner." ORDER BY `tb_kategori`.`nama` ASC;");
	echo json_encode($res);
}
else if($action == "loadDataKurir"){
	$res = array();
	$res = db_select("SELECT * FROM `tb_kurir` WHERE hapus = '0' and id_user_owner = ".$id_user_owner." ORDER BY `tb_kurir`.`nama` ASC;");
	echo json_encode($res);
}
else if($action == "loadDataPropinsi"){
	$res = array();
	$res = db_select("SELECT DISTINCT(provinsi) as provinsi FROM `tb_wilayah` 
															ORDER BY provinsi ASC");
	echo json_encode($res);
}
else if($action == "loadDataKabupaten"){
	$id_provinsi = $_REQUEST['id_provinsi'];
	$res = array();
	$res = db_select("SELECT DISTINCT(CONCAT(kota_kab,' ' ,nama_kota_kab)) as kota_kab FROM `tb_wilayah` WHERE 
																						provinsi='".$id_provinsi."' 
																						ORDER BY kota_kab ASC, nama_kota_kab ASC");
	echo json_encode($res);
}
else if($action == "loadDataKecamatan"){
	$id_provinsi = $_REQUEST['id_provinsi'];
	$id_kabupaten = $_REQUEST['id_kabupaten'];
	$res = array();
	$res = db_select("SELECT DISTINCT(kec) as kecamatan FROM `tb_wilayah` WHERE 
														provinsi='".$id_provinsi."' 
														and CONCAT(kota_kab,' ' ,nama_kota_kab)='".$id_kabupaten."' 
														ORDER BY kec ASC");
	echo json_encode($res);
}
else if($action == "loadDataKelurahan"){
	$id_provinsi = $_REQUEST['id_provinsi'];
	$id_kabupaten = $_REQUEST['id_kabupaten'];
	$id_kecamatan = $_REQUEST['id_kecamatan'];
	$res = array();
	$res = db_select("SELECT DISTINCT(kel) as kelurahan FROM `tb_wilayah` WHERE 
														provinsi='".$id_provinsi."' 
														and CONCAT(kota_kab,' ' ,nama_kota_kab)='".$id_kabupaten."' 
														and kec='".$id_kecamatan."' 
														ORDER BY kel ASC");
	echo json_encode($res);
}
else if($action == "loadDataKodePOS"){
	$id_provinsi = $_REQUEST['id_provinsi'];
	$id_kabupaten = $_REQUEST['id_kabupaten'];
	$id_kecamatan = $_REQUEST['id_kecamatan'];
	$id_kelurahan = $_REQUEST['id_kelurahan'];
	$res = array();
	$res = db_select("SELECT DISTINCT(idpos) as kode_pos FROM `tb_wilayah` WHERE 
														provinsi='".$id_provinsi."' 
														and CONCAT(kota_kab,' ' ,nama_kota_kab)='".$id_kabupaten."' 
														and kec='".$id_kecamatan."' 
														and kel='".$id_kelurahan."' 
														ORDER BY kel ASC");
	echo json_encode($res);
}
else if($action == "getProductCategory"){
	$res = array();
	$res = db_select("
						SELECT * FROM `tb_produk` as a
						INNER JOIN `tb_produk_varian` as b on b.id_produk = a.id
						WHERE a.hapus = '0' and b.hapus = '0' 
						and a.id_kategori = '".$_REQUEST['id_kategori']."'  
						and a.id_user_owner = ".$id_user_owner."
						and b.id_user_owner = ".$id_user_owner."
						GROUP BY `b`.`id_produk`
						ORDER BY  `a`.`id` DESC;
					");
	echo json_encode($res);
}
else if($action == "getProductBySearch"){
	$res = array();
	$where = "";
	if(isset($_REQUEST['id_kategori']) and $_REQUEST['id_kategori'] != null and $_REQUEST['id_kategori'] != ""){
		$where .= " and a.id_kategori = '".@$_REQUEST['id_kategori']."' ";
	}
	if(isset($_REQUEST['stringSearch']) and $_REQUEST['stringSearch'] != null and $_REQUEST['stringSearch'] != ""){
		$where .= " and a.nama_barang like '%".@$_REQUEST['stringSearch']."%' ";
	}
	
	$res = db_select("
						SELECT * FROM `tb_produk` as a
						INNER JOIN `tb_produk_varian` as b on b.id_produk = a.id
						WHERE a.hapus = '0' and b.hapus = '0' 
						and a.id_user_owner = ".$id_user_owner."
						and b.id_user_owner = ".$id_user_owner."
						".$where."
						GROUP BY `b`.`id_produk`
						ORDER BY  `a`.`id` DESC;
					");
	echo json_encode($res);
}
else if($action == "getProductDetail"){
	$res = array();
	$where_p = "";
	$where_v = "";
	if(isset($_REQUEST['id_produk']) and $_REQUEST['id_produk'] != null and $_REQUEST['id_produk'] != ""){
		$where_p .= " and id = '".$_REQUEST['id_produk']."' ";
		$where_v .= " and id_produk = '".$_REQUEST['id_produk']."' ";
	}
	
	$res['data_produk'] = db_select("
						SELECT * FROM `tb_produk`
						WHERE hapus = '0'
						and id_user_owner = ".$id_user_owner."
						".$where_p."
					;");
	$res['data_produk_varian'] = db_select("
						SELECT * FROM `tb_produk_varian`
						WHERE hapus = '0'
						and id_user_owner = ".$id_user_owner."
						".$where_v."
					;");
	$res['data_produk_grosir'] = db_select("
						SELECT * FROM `tb_produk_grosir`
						WHERE hapus = '0'
						and id_user_owner = ".$id_user_owner."
						".$where_v."
						ORDER BY qty_awal ASC
					;");				
	echo json_encode($res);
}
else if($action == "getOrderUser"){
	$res = array();
	$res['data_order'] = db_select("
						SELECT * FROM `vw_order`
						WHERE hapus = '0'
						and id_customer = ".$_REQUEST['id_customer']."
						and id_user_owner = ".$id_user_owner."
						order by id DESC
					;");				
	echo json_encode($res);	
}
else if($action == "getOrderById"){
	$id_order = $_REQUEST['id_order'];
	$res = array();
	$res['tb_order'] = db_select("SELECT * FROM `tb_order` WHERE `id` = '".$id_order."'");
	$res['tb_order_cart'] = db_select("SELECT * FROM `tb_order_cart` WHERE `id_order` = '".$id_order."'");
	$res['tb_order_cart_grosir'] = db_select("SELECT * FROM `tb_order_cart_grosir` WHERE `id_order` = '".$id_order."'");
	$res['tb_order_customer'] = db_select("SELECT * FROM `tb_order_customer` WHERE `id_order` = '".$id_order."'");
	$res['tb_order_suplier'] = db_select("SELECT * FROM `tb_order_suplier` WHERE `id_order` = '".$id_order."'");
	
	echo json_encode($res);	
}
else if($action == "userRegister"){
	$data_customer = $_REQUEST['data_input'];
	$res = db_select("SELECT id FROM `tb_customer` where 
														hapus = '0'
														and id_user_owner = '".$id_user_owner."' 
														and email = '".$data_customer['email']."' 
					;")['data'];

	if($res > 0){
		$return['result'] = $data_customer['nama_lengkap']." : ".count($res);
		$return['message'] = "User dengan email ini sudah terdaftar!";
	}else{
		$result = db_insert("INSERT INTO `tb_customer` SET
										id_membership = '',
										nama_lengkap = '".$data_customer['nama_lengkap']."',
										no_telepon = '".$data_customer['no_telepon']."',
										email = '".$data_customer['email']."',
										password = '".md5($data_customer['password'])."',
										latitude = '".$data_customer['latitude']."',
										longitude = '".$data_customer['longitude']."',
										id_propinsi = '".$data_customer['id_propinsi']."',
										id_kabupaten = '".$data_customer['id_kabupaten']."',
										id_kecamatan = '".$data_customer['id_kecamatan']."',
										id_kelurahan = '".$data_customer['id_kelurahan']."',
										kode_pos = '".$data_customer['kode_pos']."',
										alamat_lengkap = '".$data_customer['alamat_lengkap']."',
										aktif = '1',
										id_user_owner = '".$id_user_owner."',
										created_by = '".$id_user_owner."'
						;");
		
		$return['result'] = $result;
		$return['message'] = "Anda berhasil mendaftar!";
	}
	echo json_encode($return);
}
else if($action == "userLogin"){
	$data_user = $_REQUEST['data_input'];
	$res = [];
	$res['user'] = db_select("SELECT a.*, a.id as id_user, b.nama as nama_membership, b.diskon as nilai_diskon_membership, b.tipe_diskon as tipe_diskon_membership  FROM `tb_customer` a 
								LEFT JOIN tb_membership b on b.id = a.id_membership
								WHERE 
								a.hapus = '0' and 
								a.email = '".$data_user['email']."' and 
								a.password = '".md5($data_user['password'])."' 
								;");
								
	$res['toko'] = db_select("SELECT *  FROM `tb_profile_toko`
								WHERE 
								id_user_owner = '".$id_user_owner."'
								;");
	echo json_encode($res);
}
else if($action == "updateProfile"){
	$data_customer = $_REQUEST['data_input'];
	$where = "";
	if(isset($data_customer['new_password']) and $data_customer['new_password'] != "" and $data_customer['new_password'] == $data_customer['new_upassword']){
		$where .= " password = '".md5($data_customer['new_password'])."', ";
	}
	$result = db_insert("UPDATE `tb_customer` SET
									id_membership = '".$data_customer['id_membership']."',
									nama_lengkap = '".$data_customer['nama_lengkap']."',
									no_telepon = '".$data_customer['no_telepon']."',
									email = '".$data_customer['email']."',
									".$where."
									latitude = '".$data_customer['latitude']."',
									longitude = '".$data_customer['longitude']."',
									id_propinsi = '".$data_customer['id_propinsi']."',
									id_kabupaten = '".$data_customer['id_kabupaten']."',
									id_kecamatan = '".$data_customer['id_kecamatan']."',
									id_kelurahan = '".$data_customer['id_kelurahan']."',
									kode_pos = '".$data_customer['kode_pos']."',
									alamat_lengkap = '".$data_customer['alamat_lengkap']."',
									id_user_owner = '".$id_user_owner."',
									created_by = '".$id_user_owner."',
									updated_by = '".$id_user_owner."'
								WHERE
									id = '".$data_customer['id']."'
					;");
	
	$return['result'] = $result;
	$return['message'] = "Profil anda berhasil diupdate!";
	
	echo json_encode($return);
}
else if($action == "addOrder"){
	$apps_cart = $_REQUEST['apps_cart'];
	$alamat_tujuan = $_REQUEST['alamat_tujuan'];
	$id_user = $alamat_tujuan['id_user'];
	$total_harga_jual_real = 0;
	$total_berat = 0;
	
	foreach($apps_cart as $apps_cart_row){
		$apps_cart_row['harga_jual_real'] = (isset($apps_cart_row['harga_jual_grosir_real']))?$apps_cart_row['harga_jual_grosir_real']:$apps_cart_row['harga_jual_real'];
		$total_harga_jual_real += ($apps_cart_row['harga_jual_real'] * $apps_cart_row['qty_varian']);
		$total_berat += ($apps_cart_row['berat'] * $apps_cart_row['qty_varian']);
	}
	
	$nilai_diskon_membership = 0;
	if($alamat_tujuan['tipe_diskon_membership'] == "persen"){
		$nilai_diskon_membership = $total_harga_jual_real * $alamat_tujuan['nilai_diskon_membership']/100;
	}else if($alamat_tujuan['tipe_diskon_membership'] == "nilai"){
		$nilai_diskon_membership = $alamat_tujuan['nilai_diskon_membership'];
	}
	$total_harga_jual_real = $total_harga_jual_real - $nilai_diskon_membership;
		
	$res = db_select("select (count(id)+1) as count from tb_order where id_user_owner = '".$id_user_owner."';")['data'];

	$result['id_order'] = db_insert("INSERT INTO `tb_order` SET
									raw_m_apps_cart = '".base64_encode(json_encode($apps_cart))."',
									raw_m_alamat_tujuan = '".base64_encode(json_encode($alamat_tujuan))."',
									keterangan = '".$alamat_tujuan['keterangan_tambahan']."',
									id_customer = '".@$alamat_tujuan['id_customer']."',
									nama_pemesan = '".@$alamat_tujuan['nama_lengkap']."',
									alamat_tujuan = '".@$alamat_tujuan['id_propinsi'].", 
													 ".@$alamat_tujuan['id_kabupaten'].", 
													 ".@$alamat_tujuan['id_kecamatan'].", 
													 ".@$alamat_tujuan['id_kelurahan'].", 
													 ".@$alamat_tujuan['kode_pos'].", 
													 ".@$alamat_tujuan['alamat_lengkap']." ',
									status_dropship = '".((@$data_form_order['status_dropship'] === true)?1:0)."',
									nama_pemesan_dropship = '".@$data_form_order['nama_pemesan_dropship']."',
									alamat_tujuan_dropship = '".@$data_form_order['alamat_tujuan_dropship']."',
									status_order = 'Preparation In Progress',
									status_bayar = 'belum',
									no_resi = '',
									
									
									transaksi_tagihan = '".@$total_harga_jual_real."',
									transaksi_dibayar = '0',
									transaksi_kembalian = '0',
									no_urut_order = ".@$res[0]['count'].",
									aktif = '1',
									id_user_owner = '".$id_user_owner."',
									created_by = '".$id_user."',
									insert_by = 'mobile'
								;");
	$id_order = $result['id_order'];

	foreach($apps_cart as $apps_cart_row){
			
			$cart_harga_jual=(isset($apps_cart_row['harga_jual_grosir']))?$apps_cart_row['harga_jual_grosir']:$apps_cart_row['harga_jual'];
			$result['id_order_cart'][] = db_insert("INSERT INTO `tb_order_cart` SET
														id_order = '".$id_order."',
														id_suplier = '".$apps_cart_row['id_suplier']."',
														pengirim_produk = 'pribadi',
														nama_barang = '".$apps_cart_row['nama_produk']."',
														sumber_stok = 'pribadi',
														id_kategori = '".$apps_cart_row['id_kategori']."',
														deskripsi = '".$apps_cart_row['deskripsi']."',
														stat_varian = '".$apps_cart_row['stat_varian']."',
														stat_grosir_qty = '".$apps_cart_row['stat_grosir_qty']."',
														id_produk = '".$apps_cart_row['id_produk']."',
														foto = '".$apps_cart_row['foto_display']."',
														kode = '".$apps_cart_row['kode']."',
														berat = '".$apps_cart_row['berat']."',
														harga_beli = '".$apps_cart_row['harga_beli']."',
														harga_jual = '".$apps_cart_row['harga_jual']."',
														diskon = '".$apps_cart_row['diskon']."',
														diskon_tipe = '".$apps_cart_row['diskon_tipe']."',
														nama_varian = '".$apps_cart_row['nama_varian']."',
														stok = '".$apps_cart_row['stok']."',
														stok_status = '".$apps_cart_row['stok_status']."',
														id_varian = '".$apps_cart_row['id_varian']."',
														pengirim_produk_kota = '',
														cart_qty = '".$apps_cart_row['qty_varian']."',
														cart_harga_jual = '".$cart_harga_jual."',
														cart_berat = '".$apps_cart_row['berat']."'
													;");

						//if($apps_cart_row['pengirim_produk'] == "pribadi"){}
							db_exec("UPDATE `tb_produk_varian` 
											SET 
												stok = (stok - ".$apps_cart_row['qty_varian'].")
											WHERE 
												id = '".$apps_cart_row['id_varian']."' ;");
						
						
	}

	$result['id_order_customer'] = db_insert("INSERT INTO `tb_order_customer` SET
									id_order = '".$id_order."',
									id_customer = '".$alamat_tujuan['id_customer']."',
									id_membership = '".$alamat_tujuan['id_membership']."',
									nama_lengkap = '".$alamat_tujuan['nama_lengkap']."',
									no_telepon = '".$alamat_tujuan['no_telepon']."',
									email = '".$alamat_tujuan['email']."',
									id_propinsi = '".$alamat_tujuan['id_propinsi']."',
									id_kabupaten = '".$alamat_tujuan['id_kabupaten']."',
									id_kecamatan = '".$alamat_tujuan['id_kecamatan']."',
									id_kelurahan = '".$alamat_tujuan['id_kelurahan']."',
									kode_pos = '".$alamat_tujuan['kode_pos']."',
									alamat_lengkap = '".$alamat_tujuan['alamat_lengkap']."',
									membership = '".$alamat_tujuan['nama_membership']."',
									diskon_tipe = '".$alamat_tujuan['tipe_diskon_membership']."',
									diskon_nilai = '".$alamat_tujuan['nilai_diskon_membership']."'
								;");
	
	$id_suplier_gen_by_app = '{"pengirim_produk":"pribadi", "pengirim_produk_kota":"", "pengirim_produk_id":""}';
	$result['id_order_suplier'] = db_insert("INSERT INTO `tb_order_suplier` SET
									id_order = '".$id_order."',
									id_suplier = '',
									id_suplier_gen_by_app = '".$id_suplier_gen_by_app."',
									berat = '".$total_berat."',
									expedisi = 'custom',
									expedisi_service = '".$alamat_tujuan['jasa_kirim']."',
									pembayaran = '".$alamat_tujuan['pembayaran']."',
									biaya_kirim = '0',
									total_ongkir = '0',
									id_customer = '".$alamat_tujuan['id_customer']."'
					;");
	
	$return['result'] = $result;
	$return['message'] = "Anda berhasil menambah Order!";
	
	echo json_encode($return);
}
else if($action == "cancelOrder"){
	$id_order = $_REQUEST['id_order'];
		db_exec("UPDATE `tb_order` SET hapus='1'  where id = '".$id_order."' ;");
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

?>