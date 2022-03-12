//Angular Aplication Control
var dateNow = getDateNow();
var app = angular.module("niagagarut88", ["ngRoute","ngSanitize"]);
//---------------------------------------------------------- Router ----------------------------------------------------------
//---------------------------------------------------------- Router ----------------------------------------------------------
//---------------------------------------------------------- Router ----------------------------------------------------------
//---------------------------------------------------------- Router ----------------------------------------------------------
//---------------------------------------------------------- Router ----------------------------------------------------------
//---------------------------------------------------------- Router ----------------------------------------------------------
//---------------------------------------------------------- Router ----------------------------------------------------------
//---------------------------------------------------------- Router ----------------------------------------------------------
app.factory("interceptors", [function(){
	return {
		// if beforeSend is defined call it
		'request': function(request) {
			if (request.beforeSend)
				request.beforeSend();
			return request;
		},
		// if complete is defined call it
		'response': function(response) {
			if (response.config.complete)
				response.config.complete(response);
			return response;
		}
	};
}]);
app.config(function($routeProvider, $httpProvider){
	$httpProvider.interceptors.push('interceptors');
	$routeProvider
	.otherwise({
		template : "<div class='text-center centerXY' style='color:black;'><h1>404</h1><p>Oops! Page not found</p><h2>we are sorry, but the page you requested was not found</h2><p><a href='#!/'>Back to home</a></p></div>",
		controller : "ctrlOtherwise"
	})
	.when("/", {
		templateUrl : "./view/m-home.html?n="+Math.floor(Math.random() * 1000000000000000),
		controller : "ctrlHome"
	})
	.when("/login", {
		templateUrl : "./view/m-login.html?n="+Math.floor(Math.random() * 1000000000000000),
		controller : "ctrlLogin"
	})
	.when("/register", {
		templateUrl : "./view/m-register.html?n="+Math.floor(Math.random() * 1000000000000000),
		controller : "ctrlRegister"
	})
	.when("/forgot-password", {
		templateUrl : "./view/m-forgot-password.html?n="+Math.floor(Math.random() * 1000000000000000),
		controller : "ctrlForgotPassword"
	})
	.when("/user", {
		templateUrl : "./view/m-user.html?n="+Math.floor(Math.random() * 1000000000000000),
		controller : "ctrlUser"
	})
	.when("/user/form", {
		templateUrl : "./view/m-user-form.html?n="+Math.floor(Math.random() * 1000000000000000),
		controller : "ctrlUserForm"
	})
	.when("/profile_toko", {
		templateUrl : "./view/m-profile-toko.html?n="+Math.floor(Math.random() * 1000000000000000),
		controller : "ctrlProfileToko"
	})
	.when("/profile_saya", {
		templateUrl : "./view/m-profile-saya.html?n="+Math.floor(Math.random() * 1000000000000000),
		controller : "ctrlProfileSaya"
	})
	.when("/data_supplier", {
		templateUrl : "./view/m-data-supplier.html?n="+Math.floor(Math.random() * 1000000000000000),
		controller : "ctrlSupplierProduk"
	})
	.when("/kategori_produk", {
		templateUrl : "./view/m-kategori-produk.html?n="+Math.floor(Math.random() * 1000000000000000),
		controller : "ctrlKategoriProduk"
	})
	.when("/membership", {
		templateUrl : "./view/m-membership.html?n="+Math.floor(Math.random() * 1000000000000000),
		controller : "ctrlMembership"
	})
	.when("/customer", {
		templateUrl : "./view/m-customer.html?n="+Math.floor(Math.random() * 1000000000000000),
		controller : "ctrlCustomer"
	})
	.when("/kurir", {
		templateUrl : "./view/m-kurir.html?n="+Math.floor(Math.random() * 1000000000000000),
		controller : "ctrlKurir"
	})
	.when("/analysist", {
		templateUrl : "./view/m-analysist.html?n="+Math.floor(Math.random() * 1000000000000000),
		controller : "ctrlAnalysist"
	})
	.when("/report", {
		templateUrl : "./view/m-report.html?n="+Math.floor(Math.random() * 1000000000000000),
		controller : "ctrlReport"
	})
	.when("/report/generate", {
		templateUrl : "./view/m-report-generate.html?n="+Math.floor(Math.random() * 1000000000000000),
		controller : "ctrlReportGenerate"
	})
	.when("/expense", {
		templateUrl : "./view/m-expense.html?n="+Math.floor(Math.random() * 1000000000000000),
		controller : "ctrlExpense"
	})
	.when("/produk", {
		templateUrl : "./view/m-produk.html?n="+Math.floor(Math.random() * 1000000000000000),
		controller : "ctrlProduk"
	})
	.when("/order", {
		templateUrl : "./view/m-order.html?n="+Math.floor(Math.random() * 1000000000000000),
		controller : "ctrlOrder"
	})
	.when("/order/form", {
		templateUrl : "./view/m-order-form.html?n="+Math.floor(Math.random() * 1000000000000000),
		controller : "ctrlOrderForm"
	})
	.when("/affiliasi", {
		templateUrl : "./view/m-affiliasi.html?n="+Math.floor(Math.random() * 1000000000000000),
		controller : "ctrlAffiliasi"
	})
	.when("/support", {
		templateUrl : "./view/m-support.html?n="+Math.floor(Math.random() * 1000000000000000),
		controller : "ctrlSupport"
	})
	;
});
app.run(function() {
    console.log("load app.run");
	closeLoadingLoadApp();
});
//---------------------------------------------------------- Controller ----------------------------------------------------------
//---------------------------------------------------------- Controller ----------------------------------------------------------
//---------------------------------------------------------- Controller ----------------------------------------------------------
//---------------------------------------------------------- Controller ----------------------------------------------------------
//---------------------------------------------------------- Controller ----------------------------------------------------------
//---------------------------------------------------------- Controller ----------------------------------------------------------
//---------------------------------------------------------- Controller ----------------------------------------------------------
app.controller('ctrlOtherwise', function($rootScope,$scope,$location,$http){
	$scope.indexInitLoad();
});
app.controller('ctrlIndex', function($rootScope,$scope,$location,$http,$window){
	$rootScope.ClassBody = "";
	$rootScope.appMenu = JSON.parse(localStorage.getItem("session_app_menu"));
	$rootScope.session_user = {};
	$rootScope.session_toko = {};
	$rootScope.appPageParam = {};
	$rootScope.data_profile = {};
	$rootScope.data_produk_limit = {};
	$rootScope.data_propinsi = {};
	$rootScope.data_kabupaten = {};
	$rootScope.data_kecamatan = {};
	$rootScope.data_kelurahan = {};
	$rootScope.jumlah_pesan_baru = 0;
	$rootScope.BASE_URL = BASE_URL;
	$scope.loadViewNg = function(view, appPageParam = null){
		$rootScope.appPageParam = {};
		if(appPageParam != null){
			$rootScope.appPageParam = appPageParam;
		}
		loadViewNg($location,view);
	}
	$scope.kodeOrder = function(number){
		return DecimalHexTwosComplement(number);
	}
	$scope.ucWord = function(str){
		return ucWord(str);
	}
	$scope.formatRupiah = function(val){
		//console.log(typeof(val));
		return formatRupiah(parseInt(val));
	}
	$scope.sendPingToUser = function(id_user = null){
		if(id_user == "" || id_user == null) id_user = 1;
		return sendPingToUser(id_user);
	}
	$scope.formatTanggal = function(obj){
		var Y = obj.getFullYear();
		var M = (obj.getMonth() + 1);
		var D = obj.getDate();
		return D+'-'+M+'-'+Y;
	}	
	$scope.formattedString = function(pad, user_str, pad_pos){
	  if (typeof user_str === 'undefined') 
		return pad;
	  if (pad_pos == 'l')
		 {
		 return (pad + user_str).slice(-pad.length);
		 }
	  else 
		{
		return (user_str + pad).substring(0, pad.length);
		}
	}
	$scope.strToObjGetKey = function(str, key){
		var obj = JSON.parse(str);
		return obj[key];
	}
	$scope.aktifLabel = function(x){
		return (x=="1")?"Ya":"Tidak";
	}
	$scope.objLength = function(obj) {
		var size = 0, key;
		for (key in obj) {
			if (obj.hasOwnProperty(key)) size++;
		}
		return size;
	}
	$scope.getLabelDiskon = function (diskon, diskon_tipe) {
		var res = "0";
		if(diskon_tipe == "persen"){
			res = diskon+"%";
		}else if(diskon_tipe == "nilai"){
			res = $scope.formatRupiah(diskon);
		}
		return res;
	}
	$scope.getValueDiskon = function (harga, diskon, diskon_tipe) {
		var res = 0;
		if(diskon_tipe == "persen"){
			res = parseInt(harga)*parseInt(diskon)/100;
		}else if(diskon_tipe == "nilai"){
			res = parseInt(diskon);
		}
		return res;
	}
	
	$scope.loadProfileToko = function(){
		var data_param = {};
			data_param['action'] = "loadProfileToko";
			data_param['data_user'] = $rootScope.session_user;
		$http({
			method: 'POST',
			url: BASE_URL + 'API/services.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param({data_param:encObjParam(data_param)}),
			beforeSend: function() {
				//modal.show()
			},
			complete: function(response) {
				var response = response.data;
				if(response == "null"){
					$rootScope.data_profile.min_stok = 0;
					$rootScope.data_profile.deskripsi = "-";
				}else{
					response.min_stok = parseInt(response.min_stok);
					$rootScope.data_profile = response;
				}
			}
		});
	}
	$scope.loadProdukLimit = function(){
		var data_param = {};
			data_param['action'] = "loadProdukLimit";
			data_param['data_user'] = $rootScope.session_user;
		$http({
			method: 'POST',
			url: BASE_URL + 'API/services.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param({data_param:encObjParam(data_param)}),
			beforeSend: function() {
				//modal.show()
			},
			complete: function(response) {
				var response = response.data;
				//console.log(response);
				if(typeof(response.data) == "object"){
					$rootScope.data_produk_limit = response.data;
				}else{
					$rootScope.data_produk_limit = {};
				}
			}
		});
	}
	$scope.loadDataPropinsi = function () {
		var data_param = {};
			data_param['action'] = "loadDataPropinsi";
		$http({
			method: 'POST',
			url: BASE_URL + 'API/services.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param({data_param:encObjParam(data_param)}),
			beforeSend: function() {
				//modal.show()
			},
			complete: function(response) {
				var response = response.data;
				//console.log(typeof(response.data));
				//console.log(response);
				if(typeof(response.data) == "object"){
					$rootScope.data_propinsi = response.data;
				}else{
					$rootScope.data_propinsi = {};
				}
			}
		});		
	}
	$scope.loadDataKabupaten = function (id_provinsi) {
		var data_param = {};
			data_param['action'] = "loadDataKabupaten";
			data_param['id_provinsi'] = id_provinsi;
		$http({
			method: 'POST',
			url: BASE_URL + 'API/services.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param({data_param:encObjParam(data_param)}),
			beforeSend: function() {
				//modal.show()
			},
			complete: function(response) {
				var response = response.data;
				//console.log(typeof(response.data));
				//console.log(response);
				if(typeof(response.data) == "object"){
					$rootScope.data_kabupaten = response.data;
				}else{
					$rootScope.data_kabupaten = {};
				}
			}
		});		
	}
	$scope.loadDataKecamatan = function (id_provinsi,id_kabupaten) {
		var data_param = {};
			data_param['action'] = "loadDataKecamatan";
			data_param['id_provinsi'] = id_provinsi;
			data_param['id_kabupaten'] = id_kabupaten;
		$http({
			method: 'POST',
			url: BASE_URL + 'API/services.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param({data_param:encObjParam(data_param)}),
			beforeSend: function() {
				//modal.show()
			},
			complete: function(response) {
				var response = response.data;
				//console.log(typeof(response.data));
				//console.log(response);
				if(typeof(response.data) == "object"){
					$rootScope.data_kecamatan = response.data;
				}else{
					$rootScope.data_kecamatan = {};
				}
			}
		});		
	}
	$scope.loadDataKelurahan = function (id_provinsi,id_kabupaten,id_kecamatan) {
		var data_param = {};
			data_param['action'] = "loadDataKelurahan";
			data_param['id_provinsi'] = id_provinsi;
			data_param['id_kabupaten'] = id_kabupaten;
			data_param['id_kecamatan'] = id_kecamatan;
		$http({
			method: 'POST',
			url: BASE_URL + 'API/services.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param({data_param:encObjParam(data_param)}),
			beforeSend: function() {
				//modal.show()
			},
			complete: function(response) {
				var response = response.data;
				//console.log(typeof(response.data));
				//console.log(response);
				if(typeof(response.data) == "object"){
					$rootScope.data_kelurahan = response.data;
				}else{
					$rootScope.data_kelurahan = {};
				}
			}
		});		
	}
	$scope.cekLogin = function(){
		var thisLocation = $location.path();
		var session_login = localStorage.getItem("session_login");
		if(thisLocation == "/login" || thisLocation == "/register" || thisLocation == "/forgot-password"){
			if(session_login == "true"){
				$scope.loadViewNg('/');
			}
		}else{
			if(session_login !== "true"){
				$scope.loadViewNg('/login');
			}
		}
	}
	$scope.AppSignOut = function(){
		localStorage.removeItem("session_app_menu");
		localStorage.removeItem("session_user");
		localStorage.removeItem("session_toko");
		localStorage.removeItem("session_login");
		$window.location.reload();
	}
	
	$scope.getSuplierByID = function (id = null, data = null) {
		var id_suplier = "";
		if(id != "pribadi"){
			id_suplier = id.slice(7);
		}
		
		let tmp = null;
		for(i in data){
			let row = data[i];
			if(row['id_suplier'] == id_suplier){
				tmp = row;
			}
		}
		return tmp;
	}
	$scope.printOrder = function (id_order) {
        
		//console.log($scope.selectedOrder);
		var data_param = {};
			data_param['action'] = "loadDataOrderForPrint";
			data_param['data_user'] = $rootScope.session_user;
			data_param['id_order'] = id_order;
		$http({
			method: 'POST',
			url: BASE_URL + 'API/services.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param({data_param:encObjParam(data_param)}),
			beforeSend: function() {
				//modal.show()
			},
			complete: function(response) {
				//console.log(response.data);
				var response = response.data;
				var widthPrintPage = (typeof($rootScope.data_profile) != 'undefined' && typeof($rootScope.data_profile.width_print_page) != 'undefined' && parseInt($rootScope.data_profile.width_print_page) > 0)?parseInt($rootScope.data_profile.width_print_page):300;
				var PrintBorder = (typeof($rootScope.data_profile) != 'undefined' && typeof($rootScope.data_profile.print_border) != 'undefined' && parseInt($rootScope.data_profile.print_border) > 0)?parseInt($rootScope.data_profile.print_border):0;
				var PrintMarginLeft = (typeof($rootScope.data_profile) != 'undefined' && typeof($rootScope.data_profile.print_margin_left) != 'undefined' && parseInt($rootScope.data_profile.print_margin_left) > 0)?parseInt($rootScope.data_profile.print_margin_left):0;
				var PrintFontSize = (typeof($rootScope.data_profile) != 'undefined' && typeof($rootScope.data_profile.print_font_size) != 'undefined' && parseInt($rootScope.data_profile.print_font_size) > 0)?parseInt($rootScope.data_profile.print_font_size):11;
				var PrintFont = (typeof($rootScope.data_profile) != 'undefined' && typeof($rootScope.data_profile.print_font) != 'undefined')?$rootScope.data_profile.print_font:'';
				
				var dataHTML = ``;
				for(indx in response){
					var subResponse = response[indx];
					var profile_toko = subResponse.tb_profile_toko;
					var tb_order = subResponse.tb_order[0];
					var tb_order_cart = subResponse.tb_order_cart;
					var tb_order_customer = subResponse.tb_order_customer;
					var tb_order_suplier = subResponse.tb_order_suplier;
					
					if(profile_toko == null){ alert("Profil toko belum di input!"); }
					
					var group_cart = [];
					for(i in tb_order_cart){
						let row = tb_order_cart[i];
						let id_suplier = row['id_suplier'];
						if(row['pengirim_produk'] == 'pribadi'){
							if(typeof(group_cart['pribadi']) == "undefined"){
								group_cart['pribadi'] = [];
							}
							group_cart['pribadi'].push(row);
						}else{
							 if(typeof(group_cart['suplier'+id_suplier]) == "undefined"){
								 group_cart['suplier'+id_suplier] = [];
								 group_cart['suplier'+id_suplier].push(row);
							 }else{
								 group_cart['suplier'+id_suplier].push(row);
							 }
						}
					}
					
						dataHTML += `<div style="width:`+widthPrintPage+`px; border: `+PrintBorder+`px solid #000000; border-collapse: collapse; margin-left: `+PrintMarginLeft+`px; font-size: `+PrintFontSize+`px; font-family: '`+PrintFont+`';">`;
						dataHTML += profile_toko['nama']+`<br />`+profile_toko['alamat']+`<br />Telp.`+profile_toko['telepon']+`<br />`+profile_toko['deskripsi'];
						dataHTML += `<table style='width:100%;font-size: `+PrintFontSize+`px; font-family: '`+PrintFont+`';'>
										<tr>
											<td>
												No: `+$scope.formattedString('0000',tb_order.no_urut_order,'l')+`
											</td>
											<td style='text-align:right;'>
												Tanggal: `+tb_order.tanggal_order.split(" ")[0]+`
											</td>
										</tr>
									</table>`;
						dataHTML += `<br/>Ksr: `+$rootScope.session_user.nama_lengkap;
						dataHTML += `<br/>Pel: `+((typeof(tb_order_customer[0]) == "undefined")?'Umum':tb_order_customer[0]['nama_lengkap']);
					var tBayar = 0;
					var tOngkir = 0;
					
					for(var indx in group_cart){
						let dataCart = group_cart[indx];
						dataHTML += `<hr style='border-top:1px solid black;border-bottom:none;border-left:none;border-right:none;' />`;
						dataHTML += `<div style='padding:5px 3px;'><b>Pengirim #`+indx+`</b></div>`;
						dataHTML += `<hr style='border-top:1px solid black;border-bottom:none;border-left:none;border-right:none;' />`;
						dataHTML += `<table style='width:100%;font-size: `+PrintFontSize+`px; font-family: '`+PrintFont+`';'>`;
						let tQty = 0;
						let tHarga = 0;
						let tSubOngkir = 0;
						for(var x in dataCart){
							let row = dataCart[x];
							dataHTML += `<tr>
											<td style='padding:3px;' colspan='3'>`+row['nama_barang']+` `+((row['nama_varian'] != '')?'('+row['nama_varian']+')':'')+`</td> 
											<td style='padding:3px;text-align:right;font-size:10px;' colspan='2'>`+(row['cart_berat']/1000)+`(kg) / `+((row['cart_berat']*row['cart_qty'])/1000)+`(kg)</td>
										</tr>`;
							dataHTML += `<tr>
											<td style='padding:3px;'>`+row['cart_qty']+`</td>
											<td style='padding:3px;'>x</td>
											<td style='padding:3px;'>`+$scope.formatRupiah(row['cart_harga_jual'])+`</td>
											<td style='padding:3px;'>`+(($scope.getLabelDiskon(row['diskon'],row['diskon_tipe']) == '0')?'':'(-'+$scope.getLabelDiskon(row['diskon'],row['diskon_tipe'])+')')+`</td>
											<td style='padding:3px;text-align:right;'>`+$scope.formatRupiah((row['cart_harga_jual']-$scope.getValueDiskon(row['cart_harga_jual'],row['diskon'],row['diskon_tipe']))*row['cart_qty'])+`</td>  
										</tr>`;
							tQty += parseInt(row['cart_qty']);
							tHarga += parseInt((row['cart_harga_jual']-$scope.getValueDiskon(row['cart_harga_jual'],row['diskon'],row['diskon_tipe']))*row['cart_qty']);
						}
						tBayar += tHarga;
						tOngkir += tSubOngkir = parseInt($scope.getSuplierByID(indx,tb_order_suplier)['biaya_kirim'])*Math.ceil(parseInt($scope.getSuplierByID(indx,tb_order_suplier)['berat'])/1000);
						dataHTML += `<tr><td colspan='5'><hr style='border-top:1px dashed black;border-bottom:none;border-left:none;border-right:none;' /></td></tr>`;
						dataHTML += `<tr><td colspan='5'>Kurir (`+$scope.getSuplierByID(indx,tb_order_suplier)['expedisi_service']+`): `+$scope.formatRupiah($scope.getSuplierByID(indx,tb_order_suplier)['biaya_kirim'])+`</td></tr>`;
						dataHTML += `<tr><td colspan='5'>Total Berat: `+(parseInt($scope.getSuplierByID(indx,tb_order_suplier)['berat'])/1000)+`(kg)</td></tr>`;
						dataHTML += `<tr><td colspan='5'>Total Qty: `+tQty+`</td></tr>`;
						dataHTML += `<tr><td colspan='5'>Total Ongkir: `+$scope.formatRupiah(tSubOngkir)+`</td></tr>`;
						dataHTML += `<tr><td colspan='5'>Total Harga: `+$scope.formatRupiah(tHarga)+`</td></tr>`;
						dataHTML += `</table>`;
						dataHTML += ``;
					}
					dataHTML += `<br />`;
					dataHTML += `<hr style='border-top:1px dashed black;border-bottom:none;border-left:none;border-right:none;' />`;
					dataHTML += `<br />Total Tagihan: `+$scope.formatRupiah((tBayar+tOngkir));
					dataHTML += `<br />Tunai: `+$scope.formatRupiah(tb_order.transaksi_dibayar);
					dataHTML += `<br /><br />Kembalian: `+$scope.formatRupiah(tb_order.transaksi_kembalian);
					//-------------------------------Jika tedapat tujuan pengiriman-------------------------------------------------------
					if(typeof(tb_order_customer) == "object"){
						var data_customer = tb_order_customer[0];
						dataHTML += `<br />`;
						dataHTML += `<br />`;
						dataHTML += `<i class='fas fa-cut'></i><hr style='border-top:1px dashed black;border-bottom:none;border-left:none;border-right:none;' />`;
						
						//console.log(tb_order);
						//console.log(data_customer);
						/*
						dataHTML += `<br />Propinsi `+data_customer.id_propinsi+` Kota/Kab `+data_customer.id_kabupaten+` Kec `+data_customer.id_kecamatan+` Kel `+data_customer.id_kelurahan+` Kode POS `+data_customer.kode_pos+``;
						dataHTML += `<br />Alamat: `+data_customer.alamat_lengkap+` `;
						dataHTML += `<br />Nama Penerima: `+data_customer.nama_lengkap+` `;
						dataHTML += `<br />No Telepon: `+data_customer.no_telepon+` `;
						dataHTML += `<br />Email: `+data_customer.email+` `;
						*/
						if(tb_order.status_dropship == "0"){
							dataHTML += `<br /><b>Tujuan Pengiriman: </b>`;
							dataHTML += `<br />Nama Penerima: `+tb_order.nama_pemesan+` `;
							dataHTML += `<br />Alamat: `+tb_order.alamat_tujuan+` `;
						}else{
							dataHTML += `<br /><b>Pengirim: </b>`;
							dataHTML += `<br />Nama Pengirim: `+tb_order.nama_pemesan+` `;
							dataHTML += `<br />`;
							dataHTML += `<br /><b>Tujuan Pengiriman: </b>`;
							dataHTML += `<br />Nama Penerima: `+tb_order.nama_pemesan_dropship+` `;
							dataHTML += `<br />Alamat: `+tb_order.alamat_tujuan_dropship+` `;
						}
					}
					
					if(tb_order.keterangan != "-" && tb_order.keterangan != ""){
						dataHTML += `<br/>`;
						dataHTML += `<br /><b>Keterangan: </b>`;
						dataHTML += `<br />`+tb_order.keterangan+` `;
						dataHTML += `<br/><br/>`;
					}
					
					dataHTML += `</div><br/><br/>`;
				}
				
				
				var mywindow = window.open('', 'printPage', 'height=800,width=1050,left=300');
				mywindow.document.write('<html><head><title>Print</title>');
				mywindow.document.write('<link rel="stylesheet" href="./assets/sb-admin-2/vendor/fontawesome-free/css/all.min.css" type="text/css" />');
				mywindow.document.write('<link rel="stylesheet" href="./assets/font-awesome-4.7.0/css/font-awesome.min.css" type="text/css" />');
				mywindow.document.write('<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway+Dots&display=swap">');
				mywindow.document.write('<style>@font-face{ font-family:Dotmatri; src: url(./assets/fonts/DOTMATRI.TTF); }@font-face{ font-family:DotmatriBold; src: url(./assets/fonts/DOTMBold.TTF); }@font-face{ font-family:AnonymousPro; src: url(./assets/fonts/AnonymousPro-Regular.ttf); }@font-face{ font-family:ArchivoNarrow; src: url(./assets/fonts/ArchivoNarrow-Regular.ttf); }@font-face{ font-family:Inconsolata; src: url(./assets/fonts/Inconsolata-Regular.ttf); }@font-face{ font-family:Inter; src: url(./assets/fonts/Inter-Regular.ttf); }@font-face{ font-family:Lato; src: url(./assets/fonts/Lato-Regular.ttf); }@font-face{ font-family:OpenSans; src: url(./assets/fonts/OpenSans-Regular.ttf); }@font-face{ font-family:RalewayDots; src: url(./assets/fonts/RalewayDots-Regular.ttf); }@font-face{ font-family:Roboto; src: url(./assets/fonts/Roboto-Regular.ttf); }@font-face{ font-family:Rubik; src: url(./assets/fonts/Rubik-Regular.ttf); }@font-face{ font-family:Sora; src: url(./assets/fonts/Sora-Regular.ttf); }@font-face{ font-family:SpaceMono; src: url(./assets/fonts/SpaceMono-Regular.ttf); }@font-face{ font-family:Ubuntu; src: url(./assets/fonts/Ubuntu-Regular.ttf); }@font-face{ font-family:WorkSans; src: url(./assets/fonts/WorkSans-Regular.ttf); }</style>');
				/*
					Dotmatri
					DotmatriBold
					AnonymousPro
					ArchivoNarrow
					FiraSans
					Inconsolata
					Inter
					Lato
					OpenSans
					RalewayDots
					Roboto
					Rubik
					Sora
					SpaceMono
					Ubuntu
					WorkSans
				*/
				mywindow.document.write('</head><body>');
				mywindow.document.write(dataHTML);
				mywindow.document.write('</body></html>');
				
				setTimeout(function(){ 
					mywindow.print();
					//mywindow.close();
				}, 500);				
			}
		});
		
        return true;
	}
	$scope.readAffiliasi = function () {
		var url = window.location.href;
		var match = url.toString().match(/\/\?(.*)\?\//g);
		if(match != null){
			var rplc = match.toString().replace(/\/\?affiliasi\=/g,"");
			var id_affiliasi = rplc.toString().replace(/\?\//g,"");
			localStorage.setItem("id_affiliasi", id_affiliasi);
			window.location.assign(BASE_URL);
		}
	}
	$scope.loadNewTicketChat = function () {
		var data_param = {};
			data_param['action'] = "loadNewTicketChat";
			data_param['data_user'] = $rootScope.session_user;
		$http({
			method: 'POST',
			url: BASE_URL + 'API/services.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param({data_param:encObjParam(data_param)}),
			beforeSend: function() {
				//modal.show()
			},
			complete: function(response) {
				var response = response.data;
				var jumlah_pesan_baru = parseInt(response.jumlah_pesan_baru);
				$rootScope.jumlah_pesan_baru = jumlah_pesan_baru;
			}
		});		
	}
	$scope.indexInitLoad = function () {
		console.log("load indexInitLoad");
		$scope.readAffiliasi();
		$scope.cekLogin();
		$rootScope.session_user = JSON.parse(localStorage.getItem("session_user"));
		$rootScope.session_toko = JSON.parse(localStorage.getItem("session_toko"));
		$scope.loadProfileToko();
		$scope.loadProdukLimit();
		var thisLocation = $location.path();
		if(thisLocation == "/login" || thisLocation == "/register" || thisLocation == "/forgot-password"){
			$rootScope.ClassBody = "bg-gradient-primary";
		}else{
			$rootScope.ClassBody = "";
		}
		angular.element(document).ready(function(){
		  $(document).find(".navbar-nav").each(function(){ //>.nav-item>a
			  //console.log(ready);
		  });
		});
		if($rootScope.session_user != null){
			firebaseDB.ref('/tb_support_chat/' + $rootScope.session_user.id + '/ping').off();
			firebaseDB.ref('/tb_support_chat/' + $rootScope.session_user.id + '/ping').on('value', function(snapshot){
				//console.log(snapshot.val());
				$scope.loadNewTicketChat();
			});
		}
	}
});
app.controller('ctrlHome', function($rootScope,$scope,$location,$http){
	$scope.myDashboardChart = null;
	$scope.indexInitLoad();
	$scope.data_filter = {};
	$scope.data_dashboard = {};
	
	$scope.loadFilterData = function () {
		$scope.loadJudulGrafik();
		$scope.loadDataDashboard($scope.data_filter);
	}
	$scope.loadJudulGrafik = function () {
		let str = (($scope.data_filter.date_type == 'by_date')?'Tanggal '+$scope.formatTanggal($scope.data_filter.tanggal_mulai)+' s/d '+$scope.formatTanggal($scope.data_filter.tanggal_akhir):'Bulan '+$scope.data_filter.bulan+' Tahun '+$scope.data_filter.tahun);
		$scope.data_dashboard['judul_grafik'] = str;
	}
	$scope.loadDataDashboard = function (data_filter = null) {
		var data_param = {};
			data_param['action'] = "loadDataDashboard";
			data_param['data_user'] = $rootScope.session_user;
			data_param['data_filter'] = data_filter;
			//console.log(data_param);
		
		$http({
			method: 'POST',
			url: BASE_URL + 'API/services.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param({data_param:encObjParam(data_param)}),
			beforeSend: function() {
				//modal.show()
			},
			complete: function(response) {
				var response = response.data;
				//console.log(response);
				if(typeof(response) == "object"){
					var res = response;
					$scope.data_dashboard['total_order'] = parseInt(res.total_order);
					$scope.data_dashboard['belum_diproses'] = parseInt(res.belum_diproses);
					$scope.data_dashboard['terjual'] = parseInt(res.terjual);
					$scope.data_dashboard['omset'] = parseInt(res.omset);
					$scope.data_dashboard['grafik_penjualan'] = res.grafik_penjualan;
					$scope.createGrafikPenjualan();
				}else{
					$scope.data_dashboard = {};
				}
			}
		});
	}
	$scope.initGrafikPenjualan = function (){
			// Area Chart Example
			var ctx = document.getElementById("myAreaChart");
			$scope.myDashboardChart = new Chart(ctx, {
			  type: 'line',
			  data: {},
			  options: {
				maintainAspectRatio: false,
				layout: {
				  padding: {
					left: 10,
					right: 25,
					top: 25,
					bottom: 0
				  }
				},
				/*
				title: {
					display: true,
					text: 'Total Omset Rp 000.000,- (0 Produk Terjual)'
				},
				*/
				scales: {
				  xAxes: [{
					time: {
					  unit: 'date'
					},
					gridLines: {
					  display: false,
					  drawBorder: false
					},
					ticks: {
					  maxTicksLimit: 7
					}
				  }],
						yAxes: [{
							type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
							display: true,
							position: 'left',
							id: 'y-axis-1',
							// grid line settings
							ticks: {
							  maxTicksLimit: 5,
							  padding: 10,
							  // Include a dollar sign in the ticks
							  callback: function(value, index, values) {
								return (value)+' Item';
							  }
							},
							gridLines: {
							  color: "rgb(234, 236, 244)",
							  zeroLineColor: "rgb(234, 236, 244)",
							  drawBorder: false,
							  borderDash: [2],
							  zeroLineBorderDash: [2]
							},
						}, {
							type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
							display: true,
							position: 'right',
							id: 'y-axis-2',
							// grid line settings
							ticks: {
							  maxTicksLimit: 5,
							  padding: 10,
							  // Include a dollar sign in the ticks
							  callback: function(value, index, values) {
								return $scope.formatRupiah(value);
							  }
							},
							gridLines: {
							  color: "rgb(234, 236, 244)",
							  zeroLineColor: "rgb(234, 236, 244)",
							  drawBorder: false,
							  borderDash: [2],
							  zeroLineBorderDash: [2]
							},
						}],
				},
				legend: {
				  display: true
				},
				tooltips: {
				  backgroundColor: "rgb(255,255,255)",
				  bodyFontColor: "#858796",
				  titleMarginBottom: 10,
				  titleFontColor: '#6e707e',
				  titleFontSize: 14,
				  borderColor: '#dddfeb',
				  borderWidth: 1,
				  xPadding: 15,
				  yPadding: 15,
				  displayColors: false,
				  intersect: false,
				  mode: 'index',
				  caretPadding: 10,
				  callbacks: {
					label: function(tooltipItem, chart) {
					  var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
					  return datasetLabel + ((datasetLabel == 'Item')?(' '+tooltipItem.yLabel+' Pcs'):(': ' + $scope.formatRupiah(tooltipItem.yLabel)));
					}
				  }
				}
			  }
			});
	}
	$scope.createGrafikPenjualan = function (){
			var data_grafik = $scope.data_dashboard.grafik_penjualan;
			var getLabels = [];
			var getDataA = [];
			var getDataB = [];
			for(var i in data_grafik){
				let row = data_grafik[i];
				getLabels.push(row['waktu_order_val']);
				getDataA.push(row['total_qty']);
				getDataB.push(row['total_bayar']);
			}
			$scope.myDashboardChart.data = {
				labels: getLabels,
				datasets: [{
				  label: "Item",
				  lineTension: 0.3,
				  backgroundColor: "rgba(78, 115, 223, 0.05)",
				  borderColor: "rgba(78, 115, 223, 1)",
				  pointRadius: 3,
				  pointBackgroundColor: "rgba(78, 115, 223, 1)",
				  pointBorderColor: "rgba(78, 115, 223, 1)",
				  pointHoverRadius: 3,
				  pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
				  pointHoverBorderColor: "rgba(78, 115, 223, 1)",
				  pointHitRadius: 10,
				  pointBorderWidth: 2,
				  data: getDataA,
				  yAxisID: 'y-axis-1',
				},{
				  label: "Omset",
				  lineTension: 0.3,
				  backgroundColor: "rgba(0, 105, 65, 0.05)",
				  borderColor: "rgba(0, 105, 65, 1)",
				  pointRadius: 3,
				  pointBackgroundColor: "rgba(0, 105, 65, 1)",
				  pointBorderColor: "rgba(0, 105, 65, 1)",
				  pointHoverRadius: 3,
				  pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
				  pointHoverBorderColor: "rgba(78, 115, 223, 1)",
				  pointHitRadius: 10,
				  pointBorderWidth: 2,
				  data: getDataB,
				  yAxisID: 'y-axis-2',
				}],
			  };
			$scope.myDashboardChart.update();
	}
	$scope.initLoad = function () {
		var x = new Date();
		var Y = x.getFullYear();
		var M = (x.getMonth() + 1);
		
		$scope.data_filter.date_type='by_date';
		$scope.data_filter.bulan=(M).toString();
		$scope.data_filter.tahun=(Y).toString();
		$scope.data_filter.tanggal_mulai = x;
		$scope.data_filter.tanggal_akhir = x;
		$scope.initGrafikPenjualan();
		$scope.loadFilterData();
	}
	$scope.initLoad();
});
app.controller('ctrlLogin', function($rootScope,$scope,$location,$http){
	$scope.indexInitLoad();
	$scope.user = {};
	$scope.submit_login = function () {
		var data_param = {};
			data_param['action'] = "appLogin";
			data_param['data_user'] = $scope.user;
		$http({
			method: 'POST',
			url: BASE_URL + 'API/services.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param({data_param:encObjParam(data_param)}),
			beforeSend: function() {
				//modal.show()
			},
			complete: function(response) {
				//modal.hide()
				var response = response.data;
				var data_menu = response.menu;
				var data_user = response.user;
				var data_profile_toko = response.profile_toko;
				//console.log(data_menu);
				if(data_user.data === 0){
					alert("User atau Password anda salah!");
				}else{
					var dataJSONMenu = JSON.stringify(data_menu.data);
					var dataJSONUser = JSON.stringify(data_user.data[0]);
					var dataJSONToko = JSON.stringify(data_profile_toko.data[0]);
					
					localStorage.setItem("session_app_menu", dataJSONMenu);
					localStorage.setItem("session_user", dataJSONUser);
					localStorage.setItem("session_toko", dataJSONToko);
					localStorage.setItem("session_login", "true");
					$rootScope.appMenu = data_menu.data;
					$scope.loadViewNg('/');
				}
			}
		});
	}
});
app.controller('ctrlRegister', function($rootScope,$scope,$location,$http){
	$scope.indexInitLoad();
	$scope.user = {};
	$scope.submit_register = function () {
		var data_param = {};
			data_param['action'] = "appRegister";
			data_param['data_user'] = $scope.user;
		$http({
			method: 'POST',
			url: BASE_URL + 'API/services.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param({data_param:encObjParam(data_param)}),
			beforeSend: function() {
				//modal.show()
			},
			complete: function(response) {
				//modal.hide()
				var response = response.data;
				alert(response.message);
				if(typeof(response.result) == "number"){
					$scope.loadViewNg('/login');
				}
			}
		});
	}
	$scope.initLoad = function () {
		var id_affiliasi = localStorage.getItem("id_affiliasi");
		if(id_affiliasi != null){
			$scope.user.reference_by_affiliate_code = id_affiliasi;
		}
	}
	$scope.initLoad();
});
app.controller('ctrlForgotPassword', function($rootScope,$scope,$location,$http){
	$scope.indexInitLoad();
	$scope.user = {};
	$scope.submit_forgot_password = function () {
		alert("Fitur ini belum tersedia, silahkan hubungi admin kami untuk melakukan reset Password!");
	}
});
app.controller('ctrlUser', function($rootScope,$scope,$location,$http){
	$scope.indexInitLoad();
	$scope.breadcrumb = '<li class="breadcrumb-item"><a href="#!/user">User</a></li>'+
						'<li class="breadcrumb-item active" aria-current="page">List</li>';
	$scope.datatables = null;
	$scope.user = {};
	
	
	$scope.loadDataUser = function () {
		if($scope.datatables !== null){
			$scope.datatables.destroy();
			$scope.datatables = null;
		}
		var data_param = {};
			data_param['action'] = "loadDataUser";
			data_param['data_user'] = $rootScope.session_user;
		$http({
			method: 'POST',
			url: BASE_URL + 'API/services.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param({data_param:encObjParam(data_param)}),
			beforeSend: function() {
				//modal.show()
			},
			complete: function(response) {
				//modal.hide()
				var response = response.data;
				$scope.user = response.data;
				//angular.element(document).ready(function(){});
				setTimeout(function(){
					$scope.datatables = angular.element(document.querySelector('.table#dataTable')).DataTable({destroy: true, pageLength: 100});
				}, 1000);
			}
		});
	}
	$scope.deleteDataUser = function (id_user) {
		var c = confirm("Anda akan menghapus User ini?");
		if(c){
			var data_param = {};
				data_param['action'] = "deleteAppUser";
				data_param['id_user'] = id_user;
			$http({
				method: 'POST',
				url: BASE_URL + 'API/services.php',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				data: $.param({data_param:encObjParam(data_param)}),
				beforeSend: function() {
					//modal.show()
				},
				complete: function(response) {
					var response = response.data;
					$scope.loadDataUser();
					if(response.message != "") alert(response.message);
				}
			});
		}
	}
	$scope.initLoad = function () {
		$scope.loadDataUser();
	}
	$scope.initLoad();
});
app.controller('ctrlUserForm', function($rootScope,$scope,$location,$http){
	$scope.indexInitLoad();
	$scope.breadcrumb = '<li class="breadcrumb-item"><a href="#!/user">User</a></li>'+
						'<li class="breadcrumb-item active" aria-current="page">Tambah</li>';
	$scope.titlePage = "Tambah User";
	$scope.data_user = {};
	$scope.dataUserGroup = {};
	$scope.group_access = {};
	$scope.loadAppMenu = function(){
		var data_param = {};
			data_param['action'] = "loadAppMenu";
		$http({
			method: 'POST',
			url: BASE_URL + 'API/services.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param({data_param:encObjParam(data_param)}),
			beforeSend: function() {
				//modal.show()
			},
			complete: function(response) {
				$scope.dataAppMenu = response.data.app_menu.data;
			}
		});
	}
	$scope.loadUserGroup = function(){
		var data_param = {};
			data_param['action'] = "loadUserGroup";
			data_param['data_user'] = $rootScope.session_user;
		$http({
			method: 'POST',
			url: BASE_URL + 'API/services.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param({data_param:encObjParam(data_param)}),
			beforeSend: function() {
				//modal.show()
			},
			complete: function(response) {
				if(typeof(response.data.app_user_group.data) == "object"){
					$scope.dataUserGroup = response.data.app_user_group.data;
				}else{
					$scope.dataUserGroup = {};
				}
			}
		});
	}
	$scope.submit_form_user_group = function () {
		var data_param = {};
			data_param['action'] = $scope.group_access.action; // addUserGroup, updateUserGroup
			data_param['data_group_access'] = $scope.group_access;
			data_param['data_user'] = $rootScope.session_user;
		$http({
			method: 'POST',
			url: BASE_URL + 'API/services.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param({data_param:encObjParam(data_param)}),
			beforeSend: function() {
				//modal.show()
			},
			complete: function(response) {
				var response = response.data;
				$scope.group_access.nama = "";
				$scope.loadUserGroup();
				//alert(response.message);
				angular.element(document.querySelector('#ModalUserGroup')).modal('hide');
			}
		});
	}
	$scope.update_user_group = function (data_user_group) {
		$scope.loadAppMenu();
		angular.element(document.querySelector('#ModalUserGroup')).modal('show');
		
		$scope.group_access.action='updateUserGroup';
		$scope.group_access.id_user_group = data_user_group.id;
		$scope.group_access.nama = data_user_group.name;
		$scope.group_access.checked = {};		
		var x_data_access = data_user_group.data_access;
		for(var i in x_data_access){
			let id_menu = (x_data_access[i].id_menu).toString();
			$scope.group_access.checked[id_menu] = true;
		}
	}
	$scope.delete_user_group = function (id_user_group) {
		var c = confirm("Anda akan menghapus User Group ini?");
		if(c){
			var data_param = {};
				data_param['action'] = "deleteUserGroup";
				data_param['id_user_group'] = id_user_group;
			$http({
				method: 'POST',
				url: BASE_URL + 'API/services.php',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				data: $.param({data_param:encObjParam(data_param)}),
				beforeSend: function() {
					//modal.show()
				},
				complete: function(response) {
					var response = response.data;
					$scope.loadUserGroup();
					if(response.message != "") alert(response.message);
				}
			});
		}
	}
	$scope.submit_form_user = function () {
		var data_param = {};
			data_param['action'] = ($scope.data_user.action)?$scope.data_user.action:"addAppUser";
			data_param['data_user'] = $rootScope.session_user;
			data_param['data_user_submit'] = $scope.data_user;
		//console.log(data_param);
		$http({
			method: 'POST',
			url: BASE_URL + 'API/services.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param({data_param:encObjParam(data_param)}),
			beforeSend: function() {
				//modal.show()
			},
			complete: function(response) {
				var response = response.data;
				if(response.message == "Anda berhasil menambah user!"){
					$scope.data_user = {};
				}else if(response.message == "Anda berhasil update user!"){
					$scope.loadViewNg('/user');
				}
				alert(response.message);
			}
		});
	}
	$scope.initLoad = function () {
		$scope.loadUserGroup();
		let appPageParam = $rootScope.appPageParam;
		if(typeof(appPageParam.action) != "undefined" && appPageParam.action == "updateAppUser"){
			$scope.breadcrumb = '<li class="breadcrumb-item"><a href="#!/user">User</a></li>'+
								'<li class="breadcrumb-item active" aria-current="page">Update</li>';
			$scope.titlePage = "Update User";
			$scope.data_user = appPageParam.data_user;
			$scope.data_user.action = appPageParam.action;
			$scope.data_user.password = "";
			$scope.data_user.password_unrequired = true;
		}
	}
	$scope.initLoad();
});
app.controller('ctrlProfileToko', function($rootScope,$scope,$location,$http){
	$scope.indexInitLoad();
	$scope.breadcrumb = '<li class="breadcrumb-item"><a href="#!/profile_toko">Profile Toko</a></li>'+
						'<li class="breadcrumb-item active" aria-current="page">Update</li>';
	$scope.data_profile = {};
	$scope.loadDataKodePOS = function (id_provinsi,id_kabupaten,id_kecamatan,id_kelurahan) {
		var data_param = {};
			data_param['action'] = "loadDataKodePOS";
			data_param['id_provinsi'] = id_provinsi;
			data_param['id_kabupaten'] = id_kabupaten;
			data_param['id_kecamatan'] = id_kecamatan;
			data_param['id_kelurahan'] = id_kelurahan;
		$http({
			method: 'POST',
			url: BASE_URL + 'API/services.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param({data_param:encObjParam(data_param)}),
			beforeSend: function() {
				//modal.show()
			},
			complete: function(response) {
				var response = response.data;
				//console.log(typeof(response.data));
				//console.log(response);
				if(typeof(response.data) == "object"){
					$scope.data_profile.kode_pos = response.data[0].kode_pos;
				}else{
					$scope.data_profile.kode_pos = "";
				}
			}
		});		
	}
	$scope.getFileLogo = function(obj){
		var file = obj.files[0];
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function () {
			var fileEncData = reader.result;
			angular.element(document.querySelector("img.display_logo")).attr("src",fileEncData);
			$scope.data_profile.logo = fileEncData;
		};
		reader.onerror = function (error) {
			console.log('Error: ', error);
		};
	}
	$scope.loadProfileToko = function(){
		var data_param = {};
			data_param['action'] = "loadProfileToko";
			data_param['data_user'] = $rootScope.session_user;
		$http({
			method: 'POST',
			url: BASE_URL + 'API/services.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param({data_param:encObjParam(data_param)}),
			beforeSend: function() {
				//modal.show()
			},
			complete: function(response) {
				var response = response.data;
				//console.log(response);
				if(response == "null"){
					$scope.data_profile.min_stok = 0;
					$scope.data_profile.width_print_page = 0;
					$scope.data_profile.print_margin_left = 0;
					$scope.data_profile.print_font_size = 0;
					$scope.data_profile.max_jarak = 0;
					
					$scope.data_profile.deskripsi = "-";
				}else{
					//console.log(response);
					if(response.logo != ""){
						angular.element(document.querySelector("img.display_logo")).attr("src",BASE_URL+"assets/upload/logo/display/"+response.logo);
					}
					response.min_stok = parseInt(response.min_stok);
					response.width_print_page = parseInt(response.width_print_page);
					response.print_margin_left = parseInt(response.print_margin_left);
					response.print_font_size = parseInt(response.print_font_size);
					response.max_jarak = parseInt(response.max_jarak);
					
					$scope.data_profile = response;
					$scope.loadDataPropinsi();
					$scope.loadDataKabupaten($scope.data_profile.id_propinsi);
					$scope.loadDataKecamatan($scope.data_profile.id_propinsi,$scope.data_profile.id_kabupaten);
					$scope.loadDataKelurahan($scope.data_profile.id_propinsi,$scope.data_profile.id_kabupaten,$scope.data_profile.id_kecamatan);
					getMyLocation($scope.data_profile.latitude, $scope.data_profile.longitude);
				}
			}
		});
	}
	$scope.getCurrentPosition = function(){
		getMapLocation();
	}
	$scope.updateProfileToko = function(){
		if(Latitude !== undefined && Longitude !== undefined){
			$scope.data_profile.latitude = Latitude;
			$scope.data_profile.longitude = Longitude;
		}
		var data_param = {};
			data_param['action'] = "updateProfileToko";
			data_param['data_user'] = $rootScope.session_user;
			data_param['data_profile'] = $scope.data_profile;
		//console.log($scope.data_profile);
		$http({
			method: 'POST',
			url: BASE_URL + 'API/services.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param({data_param:encObjParam(data_param)}),
			beforeSend: function() {
				//modal.show()
			},
			complete: function(response) {
				var response = response.data;
				$scope.loadProfileToko();
				alert(response.message);
			}
		});
	}
	$scope.initLoad = function () {
		$scope.loadProfileToko();
		$scope.loadDataPropinsi();
		
	}
	$scope.initLoad();
});
app.controller('ctrlProfileSaya', function($rootScope,$scope,$location,$http){
	$scope.indexInitLoad();
	$scope.breadcrumb = '<li class="breadcrumb-item"><a href="#!/profile_saya">Profile Saya</a></li>'+
						'<li class="breadcrumb-item active" aria-current="page">Update</li>';
	$scope.data_profile_saya = {};
	$scope.loadProfileSaya = function(){
		var data_param = {};
			data_param['action'] = "loadProfileSaya";
			data_param['data_user'] = $rootScope.session_user;
		$http({
			method: 'POST',
			url: BASE_URL + 'API/services.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param({data_param:encObjParam(data_param)}),
			beforeSend: function() {
				//modal.show()
			},
			complete: function(response) {
				var response = response.data;
				if(typeof(response) == "object"){
					$scope.data_profile_saya = response;
					$scope.data_profile_saya.npassword = "";
					$scope.data_profile_saya.upassword = "";
				}else{
					$scope.data_profile_saya = null;
				}
			}
		});
	}
	$scope.updateProfileSaya = function(){
		var data_param = {};
			data_param['action'] = "updateProfileSaya";
			data_param['data_user'] = $rootScope.session_user;
			data_param['data_profile_saya'] = $scope.data_profile_saya;
		//console.log($scope.data_profile_saya);
		$http({
			method: 'POST',
			url: BASE_URL + 'API/services.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param({data_param:encObjParam(data_param)}),
			beforeSend: function() {
				//modal.show()
			},
			complete: function(response) {
				var response = response.data;
				$scope.loadProfileSaya();
				alert(response.message);
			}
		});
	}
	$scope.initLoad = function () {
		$scope.loadProfileSaya();
	}
	$scope.initLoad();
});
app.controller('ctrlSupplierProduk', function($rootScope,$scope,$location,$http){
	$scope.indexInitLoad();
	$scope.breadcrumb = '<li class="breadcrumb-item"><a href="#!/data_supplier">Supplier</a></li>'+
						'<li class="breadcrumb-item active" aria-current="page">Input</li>';
	$scope.data_table_suplier = {};
	$scope.data_form_suplier = {};
	$scope.loadDataKodePOS = function (id_provinsi,id_kabupaten,id_kecamatan,id_kelurahan) {
		var data_param = {};
			data_param['action'] = "loadDataKodePOS";
			data_param['id_provinsi'] = id_provinsi;
			data_param['id_kabupaten'] = id_kabupaten;
			data_param['id_kecamatan'] = id_kecamatan;
			data_param['id_kelurahan'] = id_kelurahan;
		$http({
			method: 'POST',
			url: BASE_URL + 'API/services.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param({data_param:encObjParam(data_param)}),
			beforeSend: function() {
				//modal.show()
			},
			complete: function(response) {
				var response = response.data;
				//console.log(typeof(response.data));
				//console.log(response);
				if(typeof(response.data) == "object"){
					$scope.data_form_suplier.kode_pos = response.data[0].kode_pos;
				}else{
					$scope.data_form_suplier.kode_pos = "";
				}
			}
		});		
	}
	$scope.loadDataSuplier = function () {
		var data_param = {};
			data_param['action'] = "loadDataSuplier";
			data_param['data_user'] = $rootScope.session_user;
		$http({
			method: 'POST',
			url: BASE_URL + 'API/services.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param({data_param:encObjParam(data_param)}),
			beforeSend: function() {
				//modal.show()
			},
			complete: function(response) {
				var response = response.data;
				//console.log(typeof(response.data));
				//console.log(response);
				if(typeof(response.data) == "object"){
					$scope.data_table_suplier = response.data;
				}else{
					$scope.data_table_suplier = {};
				}
			}
		});		
	}
	$scope.submitFormSuplier = function () {
		var data_param = {};
			data_param['action'] = ($scope.data_form_suplier.action)?$scope.data_form_suplier.action:"addSuplier";
			data_param['data_user'] = $rootScope.session_user;
			data_param['data_suplier'] = $scope.data_form_suplier;
			//console.log(data_param);
		$http({
			method: 'POST',
			url: BASE_URL + 'API/services.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param({data_param:encObjParam(data_param)}),
			beforeSend: function() {
				//modal.show()
			},
			complete: function(response) {
				var response = response.data;
				if(response.message != "") alert(response.message);
				if(response.message != "Nama sudah terdaftar!"){
					$scope.data_form_suplier = {};
					angular.element(document.querySelector('#modalFormSuplier')).modal('hide');
				}
				$scope.loadDataSuplier();
			}
		});
	}
	$scope.addSuplier = function () {
		//console.log(data_suplier);
		$scope.data_form_suplier = {}
		$scope.data_form_suplier.action = 'addSuplier';
		$scope.data_form_suplier.diskon = 0; 
		$scope.data_form_suplier.tipe_diskon = 'persen'; 
		$scope.data_form_suplier.sumber_produk = 'suplier'; 
		$scope.data_form_suplier.aktif = '1';
		angular.element(document.querySelector('#modalFormSuplier')).modal('show');
	}
	$scope.updateSuplier = function (data_suplier) {
		//console.log(data_suplier);
		$scope.data_form_suplier = data_suplier;
		$scope.data_form_suplier.action = "updateSuplier";
		$scope.data_form_suplier.diskon = parseInt($scope.data_form_suplier.diskon);
		angular.element(document.querySelector('#modalFormSuplier')).modal('show');
		$scope.loadDataKabupaten($scope.data_form_suplier.id_propinsi);
		$scope.loadDataKecamatan($scope.data_form_suplier.id_propinsi,$scope.data_form_suplier.id_kabupaten);
		$scope.loadDataKelurahan($scope.data_form_suplier.id_propinsi,$scope.data_form_suplier.id_kabupaten,$scope.data_form_suplier.id_kecamatan);
	}
	$scope.deleteSuplier = function (id_suplier) {
		var c = confirm("Anda akan menghapus Suplier ini?");
		if(c){
			var data_param = {};
				data_param['action'] = "deleteSuplier";
				data_param['id_suplier'] = id_suplier;
			$http({
				method: 'POST',
				url: BASE_URL + 'API/services.php',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				data: $.param({data_param:encObjParam(data_param)}),
				beforeSend: function() {
					//modal.show()
				},
				complete: function(response) {
					var response = response.data;
					$scope.loadDataSuplier();
					if(response.message != "") alert(response.message);
				}
			});
		}
	}
	$scope.initLoad = function () {
		$scope.loadDataSuplier();
		$scope.loadDataPropinsi();
	}
	$scope.initLoad();
});
app.controller('ctrlKategoriProduk', function($rootScope,$scope,$location,$http){
	$scope.indexInitLoad();
	$scope.breadcrumb = '<li class="breadcrumb-item"><a href="#!/kategori_produk">Kategori</a></li>'+
						'<li class="breadcrumb-item active" aria-current="page">Input</li>';
	$scope.data_table_kategori = {};
	$scope.data_form_kategori = {};
	$scope.loadDataKategori = function () {
		var data_param = {};
			data_param['action'] = "loadDataKategori";
			data_param['data_user'] = $rootScope.session_user;
		$http({
			method: 'POST',
			url: BASE_URL + 'API/services.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param({data_param:encObjParam(data_param)}),
			beforeSend: function() {
				//modal.show()
			},
			complete: function(response) {
				var response = response.data;
				//console.log(typeof(response.data));
				//console.log(response);
				if(typeof(response.data) == "object"){
					$scope.data_table_kategori = response.data;
				}else{
					$scope.data_table_kategori = {};
				}
			}
		});		
	}
	$scope.getFileFoto = function(obj){
		var indx = $(obj).data('index');
		var file = obj.files[0];
		
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function () {
			var fileEncData = reader.result;
			angular.element(document.querySelector("#modalFormKategori img.display_foto")).attr("src",fileEncData);
			$scope.data_form_kategori.foto_file = fileEncData;
		};
		reader.onerror = function (error) {
			console.log('Error: ', error);
		};
		
	}
	$scope.submitFormKategori = function () {
		var data_param = {};
			data_param['action'] = ($scope.data_form_kategori.action)?$scope.data_form_kategori.action:"addKategori";
			data_param['data_user'] = $rootScope.session_user;
			data_param['data_kategori'] = $scope.data_form_kategori;
			//console.log(data_param);
		$http({
			method: 'POST',
			url: BASE_URL + 'API/services.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param({data_param:encObjParam(data_param)}),
			beforeSend: function() {
				//modal.show()
			},
			complete: function(response) {
				var response = response.data;
				if(response.message != "") alert(response.message);
				if(response.message != "Kode sudah terdaftar"){
					$scope.data_form_kategori = {};
					angular.element(document.querySelector('#modalFormKategori')).modal('hide');
				}
				$scope.loadDataKategori();
			}
		});
	}
	$scope.addKategori = function () {
		$scope.data_form_kategori = {};
		$scope.data_form_kategori.action = 'addKategori'; 
		$scope.data_form_kategori.aktif = '1';
		
		angular.element(document.querySelector("#modalFormKategori")).on('shown.bs.modal', function (e) {
			setTimeout(function(){
				angular.element(document.querySelector("#modalFormKategori img.display_foto")).attr("src","data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16ba5f6da00%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16ba5f6da00%22%3E%3Crect%20width%3D%22200%22%20height%3D%22200%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2274.421875%22%20y%3D%22104.5%22%3ENone%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E");
			}, 300);
		});
		angular.element(document.querySelector('#modalFormKategori')).modal('show');
	}
	$scope.updateKategori = function (data_kategori) {
		$scope.data_form_kategori = data_kategori;
		$scope.data_form_kategori.action = "updateKategori";		
		
		angular.element(document.querySelector("#modalFormKategori")).on('shown.bs.modal', function (e) {
			setTimeout(function(){
				$empty_img = "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16ba5f6da00%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16ba5f6da00%22%3E%3Crect%20width%3D%22200%22%20height%3D%22200%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2274.421875%22%20y%3D%22104.5%22%3ENone%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E";
				$foto = $scope.data_form_kategori.foto;
				if($foto != ""){
					$foto = BASE_URL+"assets/upload/kategori/display/"+$scope.data_form_kategori.foto;
				}else{
					$foto = $empty_img;
				}
				angular.element(document.querySelector("#modalFormKategori img.display_foto")).attr("src",$foto);
			}, 300);
		});
		angular.element(document.querySelector('#modalFormKategori')).modal('show');
	}
	$scope.deleteKategori = function (id_kategori) {
		var c = confirm("Anda akan menghapus Kategori ini?");
		if(c){
			var data_param = {};
				data_param['action'] = "deleteKategori";
				data_param['id_kategori'] = id_kategori;
			$http({
				method: 'POST',
				url: BASE_URL + 'API/services.php',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				data: $.param({data_param:encObjParam(data_param)}),
				beforeSend: function() {
					//modal.show()
				},
				complete: function(response) {
					var response = response.data;
					$scope.loadDataKategori();
					if(response.message != "") alert(response.message);
				}
			});
		}
	}
	$scope.initLoad = function () {
		$scope.loadDataKategori();
	}
	$scope.initLoad();
});
app.controller('ctrlMembership', function($rootScope,$scope,$location,$http){
	$scope.indexInitLoad();
	$scope.breadcrumb = '<li class="breadcrumb-item"><a href="#!/membership">Membership</a></li>'+
						'<li class="breadcrumb-item active" aria-current="page">Input</li>';
	$scope.data_table_membership = {};
	$scope.data_form_membership = {};
	$scope.loadDataMembership = function () {
		var data_param = {};
			data_param['action'] = "loadDataMembership";
			data_param['data_user'] = $rootScope.session_user;
		$http({
			method: 'POST',
			url: BASE_URL + 'API/services.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param({data_param:encObjParam(data_param)}),
			beforeSend: function() {
				//modal.show()
			},
			complete: function(response) {
				var response = response.data;
				//console.log(typeof(response.data));
				//console.log(response);
				if(typeof(response.data) == "object"){
					$scope.data_table_membership = response.data;
				}else{
					$scope.data_table_membership = {};
				}
			}
		});		
	}
	$scope.submitFormMembership = function () {
		var data_param = {};
			data_param['action'] = ($scope.data_form_membership.action)?$scope.data_form_membership.action:"addMembership";
			data_param['data_user'] = $rootScope.session_user;
			data_param['data_membership'] = $scope.data_form_membership;
			//console.log(data_param);
		$http({
			method: 'POST',
			url: BASE_URL + 'API/services.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param({data_param:encObjParam(data_param)}),
			beforeSend: function() {
				//modal.show()
			},
			complete: function(response) {
				var response = response.data;
				if(response.message != "") alert(response.message);
				if(response.message != "Nama sudah terdaftar!"){
					$scope.data_form_membership = {};
					angular.element(document.querySelector('#modalFormMembership')).modal('hide');
				}
				$scope.loadDataMembership();
			}
		});
	}
	$scope.addMembership = function () {
		//console.log(data_membership);
		$scope.data_form_membership = {}
		$scope.data_form_membership.action = 'addMembership';
		$scope.data_form_membership.diskon = 0; 
		$scope.data_form_membership.tipe_diskon = 'persen'; 
		$scope.data_form_membership.aktif = '1';
		angular.element(document.querySelector('#modalFormMembership')).modal('show');
	}
	$scope.updateMembership = function (data_membership) {
		//console.log(data_membership);
		$scope.data_form_membership = data_membership;
		$scope.data_form_membership.action = "updateMembership";
		$scope.data_form_membership.diskon = parseInt($scope.data_form_membership.diskon);
		angular.element(document.querySelector('#modalFormMembership')).modal('show');
	}
	$scope.deleteMembership = function (id_membership) {
		var c = confirm("Anda akan menghapus Membership ini?");
		if(c){
			var data_param = {};
				data_param['action'] = "deleteMembership";
				data_param['id_membership'] = id_membership;
			$http({
				method: 'POST',
				url: BASE_URL + 'API/services.php',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				data: $.param({data_param:encObjParam(data_param)}),
				beforeSend: function() {
					//modal.show()
				},
				complete: function(response) {
					var response = response.data;
					$scope.loadDataMembership();
					if(response.message != "") alert(response.message);
				}
			});
		}
	}
	$scope.initLoad = function () {
		$scope.loadDataMembership();
	}
	$scope.initLoad();
});
app.controller('ctrlCustomer', function($rootScope,$scope,$location,$http){
	$scope.indexInitLoad();
	$scope.breadcrumb = '<li class="breadcrumb-item"><a href="#!/customer">Customer</a></li>'+
						'<li class="breadcrumb-item active" aria-current="page">Input</li>';
	$scope.data_table_customer = {};
	$scope.data_form_customer = {};
	$scope.data_membership = {};
	$scope.loadDataKodePOS = function (id_provinsi,id_kabupaten,id_kecamatan,id_kelurahan) {
		var data_param = {};
			data_param['action'] = "loadDataKodePOS";
			data_param['id_provinsi'] = id_provinsi;
			data_param['id_kabupaten'] = id_kabupaten;
			data_param['id_kecamatan'] = id_kecamatan;
			data_param['id_kelurahan'] = id_kelurahan;
		$http({
			method: 'POST',
			url: BASE_URL + 'API/services.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param({data_param:encObjParam(data_param)}),
			beforeSend: function() {
				//modal.show()
			},
			complete: function(response) {
				var response = response.data;
				//console.log(typeof(response.data));
				//console.log(response);
				if(typeof(response.data) == "object"){
					$scope.data_form_customer.kode_pos = response.data[0].kode_pos;
				}else{
					$scope.data_form_customer.kode_pos = "";
				}
			}
		});		
	}
	$scope.loadDataMembership = function () {
		var data_param = {};
			data_param['action'] = "loadDataMembership";
			data_param['data_user'] = $rootScope.session_user;
		$http({
			method: 'POST',
			url: BASE_URL + 'API/services.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param({data_param:encObjParam(data_param)}),
			beforeSend: function() {
				//modal.show()
			},
			complete: function(response) {
				var response = response.data;
				if(typeof(response.data) == "object"){
					$scope.data_membership = response.data;
				}else{
					$scope.data_membership = {};
				}
			}
		});		
	}
	$scope.loadDataCustomer = function () {
		var data_param = {};
			data_param['action'] = "loadDataCustomer";
			data_param['data_user'] = $rootScope.session_user;
		$http({
			method: 'POST',
			url: BASE_URL + 'API/services.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param({data_param:encObjParam(data_param)}),
			beforeSend: function() {
				//modal.show()
			},
			complete: function(response) {
				var response = response.data;
				//console.log(typeof(response.data));
				//console.log(response);
				if(typeof(response.data) == "object"){
					$scope.data_table_customer = response.data;
				}else{
					$scope.data_table_customer = {};
				}
			}
		});		
	}
	$scope.submitFormCustomer = function () {
		var data_param = {};
			data_param['action'] = ($scope.data_form_customer.action)?$scope.data_form_customer.action:"addCustomer";
			data_param['data_user'] = $rootScope.session_user;
			data_param['data_customer'] = $scope.data_form_customer;
			//console.log(data_param);
		$http({
			method: 'POST',
			url: BASE_URL + 'API/services.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param({data_param:encObjParam(data_param)}),
			beforeSend: function() {
				//modal.show()
			},
			complete: function(response) {
				var response = response.data;
				if(response.message != "") alert(response.message);
				if(response.message != "Customer dengan no telepon dan email ini sudah terdaftar!"){
					$scope.data_form_customer = {};
					angular.element(document.querySelector('#modalFormCustomer')).modal('hide');
				}
				$scope.loadDataCustomer();
			}
		});
	}
	$scope.addCustomer = function () {
		//console.log(data_customer);
		$scope.data_form_customer = {}
		$scope.data_form_customer.action = 'addCustomer';
		$scope.data_form_customer.aktif = '1';
		angular.element(document.querySelector('#modalFormCustomer')).modal('show');
	}
	$scope.updateCustomer = function (data_customer) {
		//console.log(data_customer);
		$scope.data_form_customer = data_customer;
		$scope.data_form_customer.action = "updateCustomer";
		angular.element(document.querySelector('#modalFormCustomer')).modal('show');
		
		$scope.loadDataKabupaten($scope.data_form_customer.id_propinsi);
		$scope.loadDataKecamatan($scope.data_form_customer.id_propinsi,$scope.data_form_customer.id_kabupaten);
		$scope.loadDataKelurahan($scope.data_form_customer.id_propinsi,$scope.data_form_customer.id_kabupaten,$scope.data_form_customer.id_kecamatan);
	}
	$scope.deleteCustomer = function (id_customer) {
		var c = confirm("Anda akan menghapus Customer ini?");
		if(c){
			var data_param = {};
				data_param['action'] = "deleteCustomer";
				data_param['id_customer'] = id_customer;
			$http({
				method: 'POST',
				url: BASE_URL + 'API/services.php',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				data: $.param({data_param:encObjParam(data_param)}),
				beforeSend: function() {
					//modal.show()
				},
				complete: function(response) {
					var response = response.data;
					$scope.loadDataCustomer();
					if(response.message != "") alert(response.message);
				}
			});
		}
	}
	$scope.initLoad = function () {
		$scope.loadDataCustomer();
		$scope.loadDataMembership();
		$scope.loadDataPropinsi();
	}
	$scope.initLoad();
});
app.controller('ctrlKurir', function($rootScope,$scope,$location,$http){
	$scope.indexInitLoad();
	$scope.breadcrumb = '<li class="breadcrumb-item"><a href="#!/kurir">Kurir</a></li>'+
						'<li class="breadcrumb-item active" aria-current="page">Input</li>';
	$scope.data_table_kurir = {};
	$scope.data_form_kurir = {};
	$scope.loadDataKurir = function () {
		var data_param = {};
			data_param['action'] = "loadDataKurir";
			data_param['data_user'] = $rootScope.session_user;
		$http({
			method: 'POST',
			url: BASE_URL + 'API/services.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param({data_param:encObjParam(data_param)}),
			beforeSend: function() {
				//modal.show()
			},
			complete: function(response) {
				var response = response.data;
				//console.log(typeof(response.data));
				//console.log(response);
				if(typeof(response.data) == "object"){
					$scope.data_table_kurir = response.data;
				}else{
					$scope.data_table_kurir = {};
				}
			}
		});		
	}
	$scope.submitFormKurir = function () {
		var data_param = {};
			data_param['action'] = ($scope.data_form_kurir.action)?$scope.data_form_kurir.action:"addKurir";
			data_param['data_user'] = $rootScope.session_user;
			data_param['data_kurir'] = $scope.data_form_kurir;
			//console.log(data_param);
		$http({
			method: 'POST',
			url: BASE_URL + 'API/services.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param({data_param:encObjParam(data_param)}),
			beforeSend: function() {
				//modal.show()
			},
			complete: function(response) {
				var response = response.data;
				if(response.message != "") alert(response.message);
				if(response.message != "Nama sudah terdaftar!"){
					$scope.data_form_kurir = {};
					angular.element(document.querySelector('#modalFormKurir')).modal('hide');
				}
				$scope.loadDataKurir();
			}
		});
	}
	$scope.addKurir = function () {
		//console.log(data_kurir);
		$scope.data_form_kurir = {}
		$scope.data_form_kurir.action = 'addKurir';
		$scope.data_form_kurir.aktif = '1';
		angular.element(document.querySelector('#modalFormKurir')).modal('show');
	}
	$scope.updateKurir = function (data_kurir) {
		//console.log(data_kurir);
		$scope.data_form_kurir = data_kurir;
		$scope.data_form_kurir.action = "updateKurir";
		angular.element(document.querySelector('#modalFormKurir')).modal('show');
	}
	$scope.deleteKurir = function (id_kurir) {
		var c = confirm("Anda akan menghapus Kurir ini?");
		if(c){
			var data_param = {};
				data_param['action'] = "deleteKurir";
				data_param['id_kurir'] = id_kurir;
			$http({
				method: 'POST',
				url: BASE_URL + 'API/services.php',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				data: $.param({data_param:encObjParam(data_param)}),
				beforeSend: function() {
					//modal.show()
				},
				complete: function(response) {
					var response = response.data;
					$scope.loadDataKurir();
					if(response.message != "") alert(response.message);
				}
			});
		}
	}
	$scope.initLoad = function () {
		$scope.loadDataKurir();
	}
	$scope.initLoad();
});
app.controller('ctrlAnalysist', function($rootScope,$scope,$location,$http){
	$scope.indexInitLoad();
	$scope.breadcrumb = '<li class="breadcrumb-item"><a href="#!/analysist">Analysist</a></li>'+
						'<li class="breadcrumb-item active" aria-current="page">Laporan</li>';
	$scope.data_filter = {};
	$scope.quick_report = {};
	
	
	$scope.loadFilterData = function () {
		$scope.loadDataReportAnalysist($scope.data_filter);
	}
	$scope.loadDataReportAnalysist = function (data_filter = null) {
		$scope.quick_report['best_seller'] = null;
		$scope.quick_report['best_customer'] = null;
		$scope.quick_report['best_location'] = null;
		$scope.quick_report['best_product'] = null;
		$scope.quick_report['grafik_penjualan'] = null;
		
		var data_param = {};
			data_param['action'] = "loadDataReportAnalysist";
			data_param['data_user'] = $rootScope.session_user;
			data_param['data_filter'] = data_filter;
			//console.log(data_param);
		
		$http({
			method: 'POST',
			url: BASE_URL + 'API/services.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param({data_param:encObjParam(data_param)}),
			beforeSend: function() {
				//modal.show()
			},
			complete: function(response) {
				var response = response.data;
				//console.log(response);
				if(typeof(response) == "object"){
					var res = response;
					$scope.quick_report['best_seller'] = res.best_seller;
					$scope.quick_report['best_customer'] = res.best_customer;
					$scope.quick_report['best_location'] = res.best_location;
					$scope.quick_report['best_product'] = res.best_product;
					$scope.quick_report['grafik_penjualan'] = res.grafik_penjualan;
					$scope.createGrafikPenjualan();
				}else{
					$scope.quick_report = {};
				}
			}
		});
	}
	$scope.openModalViewAll = function (tipe_data = null){
		/*
		best_seller
		best_customer
		best_location
		best_product
		*/
		$scope.modal_tipe_data = tipe_data;
		$scope.data_modal_analysist_view_all = angular.copy($scope.quick_report[tipe_data]);
		$scope.modal_view_all_title = $scope.ucWord(tipe_data.replace(/_/g, " "));
		angular.element(document.querySelector('#ModalViewAll')).modal('show');
	}
	$scope.initGrafikPenjualan = function (){
			// Area Chart Example
			var ctx = document.getElementById("myChartPenjualan");
			$scope.myChartPenjualan = new Chart(ctx, {
			  type: 'line',
			  data: {},
			  options: {
				maintainAspectRatio: false,
				layout: {
				  padding: {
					left: 10,
					right: 25,
					top: 25,
					bottom: 0
				  }
				},
				/*
				title: {
					display: true,
					text: 'Total Omset Rp 000.000,- (0 Produk Terjual)'
				},
				*/
				scales: {
				  xAxes: [{
					time: {
					  unit: 'date'
					},
					gridLines: {
					  display: false,
					  drawBorder: false
					},
					ticks: {
					  maxTicksLimit: 7
					}
				  }],
						yAxes: [{
							type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
							display: true,
							position: 'left',
							id: 'y-axis-1',
							// grid line settings
							ticks: {
							  maxTicksLimit: 5,
							  padding: 10,
							  // Include a dollar sign in the ticks
							  callback: function(value, index, values) {
								return (value)+' Item';
							  }
							},
							gridLines: {
							  color: "rgb(234, 236, 244)",
							  zeroLineColor: "rgb(234, 236, 244)",
							  drawBorder: false,
							  borderDash: [2],
							  zeroLineBorderDash: [2]
							},
						}, {
							type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
							display: true,
							position: 'right',
							id: 'y-axis-2',
							// grid line settings
							ticks: {
							  maxTicksLimit: 5,
							  padding: 10,
							  // Include a dollar sign in the ticks
							  callback: function(value, index, values) {
								return $scope.formatRupiah(value);
							  }
							},
							gridLines: {
							  color: "rgb(234, 236, 244)",
							  zeroLineColor: "rgb(234, 236, 244)",
							  drawBorder: false,
							  borderDash: [2],
							  zeroLineBorderDash: [2]
							},
						}],
				},
				legend: {
				  display: true
				},
				tooltips: {
				  backgroundColor: "rgb(255,255,255)",
				  bodyFontColor: "#858796",
				  titleMarginBottom: 10,
				  titleFontColor: '#6e707e',
				  titleFontSize: 14,
				  borderColor: '#dddfeb',
				  borderWidth: 1,
				  xPadding: 15,
				  yPadding: 15,
				  displayColors: false,
				  intersect: false,
				  mode: 'index',
				  caretPadding: 10,
				  callbacks: {
					label: function(tooltipItem, chart) {
					  var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
					  return datasetLabel + ((datasetLabel == 'Item')?(' '+tooltipItem.yLabel+' Pcs'):(': ' + $scope.formatRupiah(tooltipItem.yLabel)));
					}
				  }
				}
			  }
			});
	}
	$scope.createGrafikPenjualan = function (){
			var data_grafik = $scope.quick_report.grafik_penjualan;
			var getLabels = [];
			var getDataA = [];
			var getDataB = [];
			for(var i in data_grafik){
				let row = data_grafik[i];
				getLabels.push(row['waktu_order_val']);
				getDataA.push(row['total_qty']);
				getDataB.push(row['total_bayar']);
			}
			
			$scope.myChartPenjualan.data = {
				labels: getLabels,
				datasets: [{
				  label: "Item",
				  lineTension: 0.3,
				  backgroundColor: "rgba(78, 115, 223, 0.05)",
				  borderColor: "rgba(78, 115, 223, 1)",
				  pointRadius: 3,
				  pointBackgroundColor: "rgba(78, 115, 223, 1)",
				  pointBorderColor: "rgba(78, 115, 223, 1)",
				  pointHoverRadius: 3,
				  pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
				  pointHoverBorderColor: "rgba(78, 115, 223, 1)",
				  pointHitRadius: 10,
				  pointBorderWidth: 2,
				  data: getDataA,
				  yAxisID: 'y-axis-1',
				},{
				  label: "Penjualan",
				  lineTension: 0.3,
				  backgroundColor: "rgba(0, 105, 65, 0.05)",
				  borderColor: "rgba(0, 105, 65, 1)",
				  pointRadius: 3,
				  pointBackgroundColor: "rgba(0, 105, 65, 1)",
				  pointBorderColor: "rgba(0, 105, 65, 1)",
				  pointHoverRadius: 3,
				  pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
				  pointHoverBorderColor: "rgba(78, 115, 223, 1)",
				  pointHitRadius: 10,
				  pointBorderWidth: 2,
				  data: getDataB,
				  yAxisID: 'y-axis-2',
				}],
			  };
			$scope.myChartPenjualan.update();
	}
	$scope.initLoad = function () {
		var x = new Date();
		var Y = x.getFullYear();
		var M = (x.getMonth() + 1);
		
		$scope.data_filter.date_type='by_month';
		$scope.data_filter.bulan=(M).toString();
		$scope.data_filter.tahun=(Y).toString();
		$scope.data_filter.tanggal_mulai = x;
		$scope.data_filter.tanggal_akhir = x;
		$scope.initGrafikPenjualan();
		$scope.loadFilterData();
	}
	$scope.initLoad();
});
app.controller('ctrlReport', function($rootScope,$scope,$location,$http){
	$scope.indexInitLoad();
	$scope.breadcrumb = '<li class="breadcrumb-item"><a href="#!/report">Report</a></li>'+
						'<li class="breadcrumb-item active" aria-current="page">Laporan</li>';
	$scope.data_filter = {};
	$scope.quick_report = {};
	
	$scope.loadAllData = function () {
		var x = new Date("Tue Jan 01 2019 08:36:37 GMT+0700 (Western Indonesia Time)");
		var y = new Date();
		$scope.data_filter = {
			date_type : "by_date",
			tanggal_mulai : x,
			tanggal_akhir : y
		};
		$scope.loadDataReport($scope.data_filter);
	}
	$scope.loadFilterData = function () {
		$scope.loadDataReport($scope.data_filter);
	}
	$scope.loadDataReport = function (data_filter = null) {
		$scope.quick_report['total_penjualan'] = 0;
		$scope.quick_report['total_keuntungan'] = 0;
		$scope.quick_report['total_nilai_produk'] = 0;
		$scope.quick_report['total_expense'] = 0;
		$scope.quick_report['total_ongkir'] = 0;
		$scope.quick_report['total_diskon'] = 0;
		$scope.quick_report['jumlah_order'] = 0;
		$scope.quick_report['jumlah_item_terjual'] = 0;
		
		var data_param = {};
			data_param['action'] = "loadDataReport";
			data_param['data_user'] = $rootScope.session_user;
			data_param['data_filter'] = data_filter;
			//console.log(data_param);
		
		$http({
			method: 'POST',
			url: BASE_URL + 'API/services.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param({data_param:encObjParam(data_param)}),
			beforeSend: function() {
				//modal.show()
			},
			complete: function(response) {
				var response = response.data;
				//console.log(response);
				if(typeof(response) == "object"){
					var res = response;
					$scope.quick_report['total_penjualan'] = parseInt(res.total_penjualan);
					$scope.quick_report['total_keuntungan'] = parseInt(res.total_penjualan)-parseInt(res.total_nilai_produk);
					$scope.quick_report['total_nilai_produk'] = parseInt(res.total_nilai_produk);
					$scope.quick_report['total_expense'] = parseInt(res.total_expense);
					$scope.quick_report['total_ongkir'] = parseInt(res.total_ongkir);
					$scope.quick_report['total_diskon'] = parseInt(res.total_diskon);
					$scope.quick_report['jumlah_order'] = parseInt(res.jumlah_order);
					$scope.quick_report['jumlah_item_terjual'] = parseInt(res.jumlah_item_terjual);
					$scope.quick_report['grafik_penjualan'] = res.grafik_penjualan;
					$scope.quick_report['grafik_keuntungan'] = res.grafik_keuntungan;
					$scope.createGrafikPenjualan();
					$scope.createGrafikKeuntungan();
				}else{
					$scope.quick_report = {};
				}
			}
		});
	}
	$scope.initGrafikPenjualan = function (){
			// Area Chart Example
			var ctx = document.getElementById("myChartPenjualan");
			$scope.myChartPenjualan = new Chart(ctx, {
			  type: 'line',
			  data: {},
			  options: {
				maintainAspectRatio: false,
				layout: {
				  padding: {
					left: 10,
					right: 25,
					top: 25,
					bottom: 0
				  }
				},
				/*
				title: {
					display: true,
					text: 'Total Omset Rp 000.000,- (0 Produk Terjual)'
				},
				*/
				scales: {
				  xAxes: [{
					time: {
					  unit: 'date'
					},
					gridLines: {
					  display: false,
					  drawBorder: false
					},
					ticks: {
					  maxTicksLimit: 7
					}
				  }],
						yAxes: [{
							type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
							display: true,
							position: 'left',
							id: 'y-axis-1',
							// grid line settings
							ticks: {
							  maxTicksLimit: 5,
							  padding: 10,
							  // Include a dollar sign in the ticks
							  callback: function(value, index, values) {
								return (value)+' Item';
							  }
							},
							gridLines: {
							  color: "rgb(234, 236, 244)",
							  zeroLineColor: "rgb(234, 236, 244)",
							  drawBorder: false,
							  borderDash: [2],
							  zeroLineBorderDash: [2]
							},
						}, {
							type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
							display: true,
							position: 'right',
							id: 'y-axis-2',
							// grid line settings
							ticks: {
							  maxTicksLimit: 5,
							  padding: 10,
							  // Include a dollar sign in the ticks
							  callback: function(value, index, values) {
								return $scope.formatRupiah(value);
							  }
							},
							gridLines: {
							  color: "rgb(234, 236, 244)",
							  zeroLineColor: "rgb(234, 236, 244)",
							  drawBorder: false,
							  borderDash: [2],
							  zeroLineBorderDash: [2]
							},
						}],
				},
				legend: {
				  display: true
				},
				tooltips: {
				  backgroundColor: "rgb(255,255,255)",
				  bodyFontColor: "#858796",
				  titleMarginBottom: 10,
				  titleFontColor: '#6e707e',
				  titleFontSize: 14,
				  borderColor: '#dddfeb',
				  borderWidth: 1,
				  xPadding: 15,
				  yPadding: 15,
				  displayColors: false,
				  intersect: false,
				  mode: 'index',
				  caretPadding: 10,
				  callbacks: {
					label: function(tooltipItem, chart) {
					  var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
					  return datasetLabel + ((datasetLabel == 'Item')?(' '+tooltipItem.yLabel+' Pcs'):(': ' + $scope.formatRupiah(tooltipItem.yLabel)));
					}
				  }
				}
			  }
			});
	}
	$scope.initGrafikKeuntungan = function (){
			// Area Chart Example
			var ctx = document.getElementById("myChartKeuntungan");
			$scope.myChartKeuntungan = new Chart(ctx, {
			  type: 'line',
			  data: {},
			  options: {
				maintainAspectRatio: false,
				layout: {
				  padding: {
					left: 10,
					right: 25,
					top: 25,
					bottom: 0
				  }
				},
				/*
				title: {
					display: true,
					text: 'Total Omset Rp 000.000,- (0 Produk Terjual)'
				},
				*/
				scales: {
				  xAxes: [{
					time: {
					  unit: 'date'
					},
					gridLines: {
					  display: false,
					  drawBorder: false
					},
					ticks: {
					  maxTicksLimit: 7
					}
				  }],
						yAxes: [{
							type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
							display: true,
							position: 'left',
							id: 'y-axis-1',
							// grid line settings
							ticks: {
							  maxTicksLimit: 5,
							  padding: 10,
							  // Include a dollar sign in the ticks
							  callback: function(value, index, values) {
								return $scope.formatRupiah(value);
							  }
							},
							gridLines: {
							  color: "rgb(234, 236, 244)",
							  zeroLineColor: "rgb(234, 236, 244)",
							  drawBorder: false,
							  borderDash: [2],
							  zeroLineBorderDash: [2]
							},
						}, {
							type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
							display: true,
							position: 'right',
							id: 'y-axis-2',
							// grid line settings
							ticks: {
							  maxTicksLimit: 5,
							  padding: 10,
							  // Include a dollar sign in the ticks
							  callback: function(value, index, values) {
								return $scope.formatRupiah(value);
							  }
							},
							gridLines: {
							  color: "rgb(234, 236, 244)",
							  zeroLineColor: "rgb(234, 236, 244)",
							  drawBorder: false,
							  borderDash: [2],
							  zeroLineBorderDash: [2]
							},
						}],
				},
				legend: {
				  display: true
				},
				tooltips: {
				  backgroundColor: "rgb(255,255,255)",
				  bodyFontColor: "#858796",
				  titleMarginBottom: 10,
				  titleFontColor: '#6e707e',
				  titleFontSize: 14,
				  borderColor: '#dddfeb',
				  borderWidth: 1,
				  xPadding: 15,
				  yPadding: 15,
				  displayColors: false,
				  intersect: false,
				  mode: 'index',
				  caretPadding: 10,
				  callbacks: {
					label: function(tooltipItem, chart) {
					  var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
					  return datasetLabel + ((datasetLabel == 'Item')?(' '+tooltipItem.yLabel+' Pcs'):(': ' + $scope.formatRupiah(tooltipItem.yLabel)));
					}
				  }
				}
			  }
			});
	}
	$scope.createGrafikPenjualan = function (){
			var data_grafik = $scope.quick_report.grafik_penjualan;
			var getLabels = [];
			var getDataA = [];
			var getDataB = [];
			for(var i in data_grafik){
				let row = data_grafik[i];
				getLabels.push(row['waktu_order_val']);
				getDataA.push(row['total_qty']);
				getDataB.push(row['total_bayar']);
			}
			
			$scope.myChartPenjualan.data = {
				labels: getLabels,
				datasets: [{
				  label: "Item",
				  lineTension: 0.3,
				  backgroundColor: "rgba(78, 115, 223, 0.05)",
				  borderColor: "rgba(78, 115, 223, 1)",
				  pointRadius: 3,
				  pointBackgroundColor: "rgba(78, 115, 223, 1)",
				  pointBorderColor: "rgba(78, 115, 223, 1)",
				  pointHoverRadius: 3,
				  pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
				  pointHoverBorderColor: "rgba(78, 115, 223, 1)",
				  pointHitRadius: 10,
				  pointBorderWidth: 2,
				  data: getDataA,
				  yAxisID: 'y-axis-1',
				},{
				  label: "Penjualan",
				  lineTension: 0.3,
				  backgroundColor: "rgba(0, 105, 65, 0.05)",
				  borderColor: "rgba(0, 105, 65, 1)",
				  pointRadius: 3,
				  pointBackgroundColor: "rgba(0, 105, 65, 1)",
				  pointBorderColor: "rgba(0, 105, 65, 1)",
				  pointHoverRadius: 3,
				  pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
				  pointHoverBorderColor: "rgba(78, 115, 223, 1)",
				  pointHitRadius: 10,
				  pointBorderWidth: 2,
				  data: getDataB,
				  yAxisID: 'y-axis-2',
				}],
			  };
			$scope.myChartPenjualan.update();
	}
	$scope.createGrafikKeuntungan = function (){
			var data_grafik = $scope.quick_report.grafik_keuntungan;
			var getLabels = [];
			var getDataA = [];
			var getDataB = [];
			//console.log(data_grafik);
			for(var i in data_grafik){
				let row = data_grafik[i];
				getLabels.push(row['waktu_order_val']);
				getDataA.push(row['total_harga_jual']);
				getDataB.push(row['total_keuntungan']);
			}
			//console.log(data_grafik);
			$scope.myChartKeuntungan.data = {
				labels: getLabels,
				datasets: [{
				  label: "Penjualan",
				  lineTension: 0.3,
				  backgroundColor: "rgba(78, 115, 223, 0.05)",
				  borderColor: "rgba(78, 115, 223, 1)",
				  pointRadius: 3,
				  pointBackgroundColor: "rgba(78, 115, 223, 1)",
				  pointBorderColor: "rgba(78, 115, 223, 1)",
				  pointHoverRadius: 3,
				  pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
				  pointHoverBorderColor: "rgba(78, 115, 223, 1)",
				  pointHitRadius: 10,
				  pointBorderWidth: 2,
				  data: getDataA,
				  yAxisID: 'y-axis-1',
				},{
				  label: "Keuntungan",
				  lineTension: 0.3,
				  backgroundColor: "rgba(0, 105, 65, 0.05)",
				  borderColor: "rgba(0, 105, 65, 1)",
				  pointRadius: 3,
				  pointBackgroundColor: "rgba(0, 105, 65, 1)",
				  pointBorderColor: "rgba(0, 105, 65, 1)",
				  pointHoverRadius: 3,
				  pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
				  pointHoverBorderColor: "rgba(78, 115, 223, 1)",
				  pointHitRadius: 10,
				  pointBorderWidth: 2,
				  data: getDataB,
				  yAxisID: 'y-axis-2',
				}],
			  };
			$scope.myChartKeuntungan.update();
	}
	$scope.initLoad = function () {
		var x = new Date();
		var Y = x.getFullYear();
		var M = (x.getMonth() + 1);
		
		$scope.data_filter.date_type='by_date';
		$scope.data_filter.bulan=(M).toString();
		$scope.data_filter.tahun=(Y).toString();
		$scope.data_filter.tanggal_mulai = x;
		$scope.data_filter.tanggal_akhir = x;
		$scope.initGrafikPenjualan();
		$scope.initGrafikKeuntungan();
		$scope.loadFilterData();
	}
	$scope.initLoad();
});
app.controller('ctrlReportGenerate', function($rootScope,$scope,$location,$http){
	$scope.indexInitLoad();
	$scope.breadcrumb = '<li class="breadcrumb-item"><a href="#!/report">Report</a></li>'+
						'<li class="breadcrumb-item"><a href="#!/report/generate">Laporan</a></li>'+
						'<li class="breadcrumb-item active" aria-current="page">Generate</li>';
	$scope.datatables = null;
	$scope.data_filter = {};
	$scope.data_report = {};
	
	$scope.loadAllData = function () {
		var x = new Date("Tue Jan 01 2019 08:36:37 GMT+0700 (Western Indonesia Time)");
		var y = new Date();
		$scope.data_filter = {
			date_type : "by_date",
			tanggal_mulai : x,
			tanggal_akhir : y
		};
		$scope.loadDataReportGenerate($scope.data_filter);
	}
	$scope.loadFilterData = function () {
		$scope.loadDataReportGenerate($scope.data_filter);
	}
	$scope.loadDataReportGenerate = function (data_filter = null) {
		if($scope.datatables !== null){
			$scope.datatables.destroy();
			$scope.datatables = null;
		}
		
		var data_param = {};
			data_param['action'] = "loadDataReportGenerate";
			data_param['data_user'] = $rootScope.session_user;
			data_param['data_filter'] = data_filter;
			//console.log(data_param);
		$http({
			method: 'POST',
			url: BASE_URL + 'API/services.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param({data_param:encObjParam(data_param)}),
			beforeSend: function() {
				//modal.show()
			},
			complete: function(response) {
				var response = response.data;
				//console.log(typeof(response.data));
				//console.log(response);
				if(typeof(response.data) == "object"){
					var res = response.data;
					for(i in res){
						//res[i].total_belanja = parseInt(res[i].total_belanja);
					}
					$scope.data_report = res;
				}else{
					$scope.data_report = {};
				}
				setTimeout(function(){
					var printCounter = 0;
					$scope.datatables = angular.element(document.querySelector('.table#dataTable')).DataTable({
						destroy: true,
						dom: 'Bfrtip',
						buttons: [
							'copy',
							{
								extend: 'excel',
								messageTop: 'The information in this table is copyright to Sirius Cybernetics Corp.'
							},
							/*
							{
								extend: 'pdf',
								messageBottom: null
							},
							{
								extend: 'print',
								messageTop: function () {
									printCounter++;
				 
									if ( printCounter === 1 ) {
										return 'This is the first time you have printed this document.';
									}
									else {
										return 'You have printed this document '+printCounter+' times';
									}
								},
								messageBottom: null
							}
							*/
						]
					});
				}, 1000);
			}
		});		
	}
	$scope.initLoad = function () {
		var x = new Date();
		var Y = x.getFullYear();
		var M = (x.getMonth() + 1);
		
		$scope.data_filter.date_type='by_date';
		$scope.data_filter.bulan=(M).toString();
		$scope.data_filter.tahun=(Y).toString();
		$scope.data_filter.tanggal_mulai = x;
		$scope.data_filter.tanggal_akhir = x;
		
		let appPageParam = $rootScope.appPageParam;
		//console.log(appPageParam);
		if(typeof(appPageParam.action) != "undefined" && appPageParam.action == "loadDataReportByFilter"){
			let data_filter = appPageParam['data_filter'];
			$scope.data_filter.date_type = data_filter.date_type;
			$scope.data_filter.bulan = data_filter.bulan;
			$scope.data_filter.tahun = data_filter.tahun;
			$scope.data_filter.tanggal_mulai = data_filter.tanggal_mulai;
			$scope.data_filter.tanggal_akhir = data_filter.tanggal_akhir;
		}
		$scope.loadFilterData();
	}
	$scope.initLoad();
});	
app.controller('ctrlExpense', function($rootScope,$scope,$location,$http){
	$scope.indexInitLoad();
	$scope.breadcrumb = '<li class="breadcrumb-item"><a href="#!/expense">Expense</a></li>'+
						'<li class="breadcrumb-item active" aria-current="page">Input</li>';

	$scope.data_table_expense = {};
	$scope.data_form_expense = {};
	$scope.data_filter = {};
	$scope.loadFilterData = function () {
		$scope.loadDataExpense($scope.data_filter);
	}
	$scope.loadDataExpense = function (data_filter = null) {
		var data_param = {};
			data_param['action'] = "loadDataExpense";
			data_param['data_user'] = $rootScope.session_user;
			data_param['data_filter'] = data_filter;
		$http({
			method: 'POST',
			url: BASE_URL + 'API/services.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param({data_param:encObjParam(data_param)}),
			beforeSend: function() {
				//modal.show()
			},
			complete: function(response) {
				var response = response.data;
				//console.log(typeof(response.data));
				//console.log(response);
				if(typeof(response.data) == "object"){
					$scope.data_table_expense = response.data;
				}else{
					$scope.data_table_expense = {};
				}
			}
		});		
	}
	$scope.submitFormExpense = function () {
		var data_param = {};
			data_param['action'] = ($scope.data_form_expense.action)?$scope.data_form_expense.action:"addExpense";
			data_param['data_user'] = $rootScope.session_user;
			data_param['data_expense'] = $scope.data_form_expense;
			//console.log(data_param);
		$http({
			method: 'POST',
			url: BASE_URL + 'API/services.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param({data_param:encObjParam(data_param)}),
			beforeSend: function() {
				//modal.show()
			},
			complete: function(response) {
				var response = response.data;
				if(response.message != "") alert(response.message);
				if(response.message != "Nama sudah terdaftar!"){
					$scope.data_form_expense = {};
					angular.element(document.querySelector('#modalFormExpense')).modal('hide');
				}
				$scope.loadDataExpense();
			}
		});
	}
	$scope.addExpense = function () {
		//console.log(data_expense);
		$scope.data_form_expense = {}
		$scope.data_form_expense.action = 'addExpense';
		$scope.data_form_expense.aktif = '1';
		$scope.data_form_expense.tanggal = new Date();
		$scope.data_form_expense.biaya = 0;
		$scope.data_form_expense.jumlah = 1;
		angular.element(document.querySelector('#modalFormExpense')).modal('show');
	}
	$scope.updateExpense = function (data_expense) {
		//console.log(data_expense);
		$scope.data_form_expense = data_expense;
		$scope.data_form_expense.action = "updateExpense";
		$scope.data_form_expense.biaya = parseInt($scope.data_form_expense.biaya);
		$scope.data_form_expense.jumlah = parseInt($scope.data_form_expense.jumlah);
		$scope.data_form_expense.tanggal = new Date($scope.data_form_expense.tanggal);
		//"2019-07-30T17:00:00.000Z"
		angular.element(document.querySelector('#modalFormExpense')).modal('show');
	}
	$scope.deleteExpense = function (id_expense) {
		var c = confirm("Anda akan menghapus Expense ini?");
		if(c){
			var data_param = {};
				data_param['action'] = "deleteExpense";
				data_param['id_expense'] = id_expense;
			$http({
				method: 'POST',
				url: BASE_URL + 'API/services.php',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				data: $.param({data_param:encObjParam(data_param)}),
				beforeSend: function() {
					//modal.show()
				},
				complete: function(response) {
					var response = response.data;
					$scope.loadDataExpense();
					if(response.message != "") alert(response.message);
				}
			});
		}
	}
	$scope.initLoad = function () {
		var x = new Date();
		var Y = x.getFullYear();
		var M = (x.getMonth() + 1);
		
		$scope.loadFilterData();
		$scope.data_filter.date_type='by_month';
		$scope.data_filter.bulan=(M).toString();
		$scope.data_filter.tahun=(Y).toString();
		$scope.data_filter.tanggal_mulai = x;
		$scope.data_filter.tanggal_akhir = x;
	}
	$scope.initLoad();
});
app.controller('ctrlProduk', function($rootScope,$scope,$location,$http){
	$scope.indexInitLoad();
	$scope.breadcrumb = '<li class="breadcrumb-item"><a href="#!/produk">Produk</a></li>'+
						'<li class="breadcrumb-item active" aria-current="page">Input</li>';

	$scope.datatables = null;
	$scope.data_table_produk = {};
	$scope.data_form_produk = {};
	$scope.data_form_produk.data_varian = [];
	$scope.data_form_produk.data_grosir = [];
	$scope.data_filter = {};
	$scope.data_table_kategori = {};
	$scope.data_table_suplier = [];
	$scope.data_produk_nama_barang = [];
	
	$scope.cekNamaBarang = function(){
		var nama_barang = $scope.data_form_produk.nama_barang;
		if( typeof(nama_barang) != 'undefined' && nama_barang != "" && nama_barang.length > 2){
			var data_param = {};
				data_param['action'] = "cekProdukNamaBarang";
				data_param['data_user'] = $rootScope.session_user;
				data_param['data_filter'] = {nama_barang:nama_barang, aktif:'1'};
			$http({
				method: 'POST',
				url: BASE_URL + 'API/services.php',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				data: $.param({data_param:encObjParam(data_param)}),
				beforeSend: function() {
					//modal.show()
				},
				complete: function(response) {
					var response = response.data;
					//console.log(typeof(response.data));
					//console.log(response);
					if(typeof(response.data) == "object"){
						$scope.data_produk_nama_barang = response.data;
					}else{
						$scope.data_produk_nama_barang = [];
					}
				}
			});
		}else{
			$scope.data_produk_nama_barang = [];
		}
	}
	$scope.setHargaVarian = function(){
		var harga = $scope.data_form_produk.harga;
		var data_varian = $scope.data_form_produk.data_varian;
		for(var i in data_varian){
			$scope.data_form_produk.data_varian[i].harga_jual = harga;
		}
	}
	$scope.setDiskonVarian = function(){
		var diskon = $scope.data_form_produk.diskon;
		var data_varian = $scope.data_form_produk.data_varian;
		for(var i in data_varian){
			$scope.data_form_produk.data_varian[i].diskon = diskon;
		}
	}
	$scope.addVarian = function(){
        $scope.data_form_produk.data_varian.push({stok_status:'tersedia', harga_jual:$scope.data_form_produk.harga, diskon:$scope.data_form_produk.diskon});
	}
	$scope.changeStatHanyaFoto = function(indx){
		var stat = $scope.data_form_produk.data_varian[indx].stat_hanya_foto;
		if(stat){
			$scope.data_form_produk.data_varian[indx].berat = 0;
			$scope.data_form_produk.data_varian[indx].harga_beli = 0;
			$scope.data_form_produk.data_varian[indx].harga_jual = 0;
			$scope.data_form_produk.data_varian[indx].diskon = 0;
			$scope.data_form_produk.data_varian[indx].nama_varian = 0;
			$scope.data_form_produk.data_varian[indx].stok = 0;
		}
	}
    $scope.deleteVarian = function(obj){
        var oldVarian = $scope.data_form_produk.data_varian;
		if(oldVarian.length < 2){
			alert("Minimal harus ada 1 foto produk!");
		}else{
			$scope.data_form_produk.data_varian = [];
			angular.forEach(oldVarian, function(x) {
				if (x.$$hashKey != obj.$$hashKey) $scope.data_form_produk.data_varian.push(x);
			});
		}
    };
	$scope.getFileFoto = function(obj){
		var indx = $(obj).data('index');
		var file = obj.files[0];
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function () {
			var fileEncData = reader.result;
			angular.element(document.querySelector("#modalFormProduk img.display_foto_"+indx)).attr("src",fileEncData);
			$scope.data_form_produk.data_varian[indx].foto_file = fileEncData;
		};
		reader.onerror = function (error) {
			console.log('Error: ', error);
		};
	}
	$scope.loadDataKategori = function () {
		var data_param = {};
			data_param['action'] = "loadDataKategori";
			data_param['data_user'] = $rootScope.session_user;
			data_param['data_filter'] = {aktif:'1'};
		$http({
			method: 'POST',
			url: BASE_URL + 'API/services.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param({data_param:encObjParam(data_param)}),
			beforeSend: function() {
				//modal.show()
			},
			complete: function(response) {
				var response = response.data;
				//console.log(typeof(response.data));
				//console.log(response);
				if(typeof(response.data) == "object"){
					$scope.data_table_kategori = response.data;
				}else{
					$scope.data_table_kategori = {};
				}
			}
		});
	}
	$scope.loadDataSuplier = function () {
		var data_param = {};
			data_param['action'] = "loadDataSuplier";
			data_param['data_user'] = $rootScope.session_user;
		$http({
			method: 'POST',
			url: BASE_URL + 'API/services.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param({data_param:encObjParam(data_param)}),
			beforeSend: function() {
				//modal.show()
			},
			complete: function(response) {
				var response = response.data;
				//console.log(typeof(response.data));
				//console.log(response);
				if(typeof(response.data) == "object"){
					$scope.data_table_suplier = response.data;
				}else{
					$scope.data_table_suplier = {};
				}
			}
		});		
	}
	$scope.loadFilterData = function () {
		$scope.loadDataProduk($scope.data_filter);
	}
	$scope.loadDataProduk = function (data_filter = null) {
		if($scope.datatables !== null){
			$scope.datatables.destroy();
			$scope.datatables = null;
		}
		var data_param = {};
			data_param['action'] = "loadDataProduk";
			data_param['data_user'] = $rootScope.session_user;
			data_param['data_filter'] = data_filter;
			//console.log(data_param);
		$http({
			method: 'POST',
			url: BASE_URL + 'API/services.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param({data_param:encObjParam(data_param)}),
			beforeSend: function() {
				//modal.show()
				openLoadingLoadApp();
			},
			complete: function(response) {
				var response = response.data;
				//console.log(typeof(response.data));
				//console.log(response);
				if(typeof(response.data) == "object"){
					$scope.data_table_produk = response.data;
				}else{
					$scope.data_table_produk = {};
				}
				//angular.element(document).ready(function(){});
				setTimeout(function(){
					$scope.datatables = angular.element(document.querySelector('.table#dataTableProduk')).DataTable({destroy: true});
					closeLoadingLoadApp();
				}, 1000);
			}
		});		
	}
	$scope.changeSuplier = function () {
		var id_suplier = $scope.data_form_produk.id_suplier;
		var data_table_suplier = $scope.data_table_suplier;
		$scope.data_form_produk.diskon = 0;
		$scope.data_form_produk.diskon_tipe = 'persen';
		for(i in data_table_suplier){
			let row = data_table_suplier[i];
			if(row.id == id_suplier){
				$scope.data_form_produk.diskon = parseInt(row.diskon);
				$scope.data_form_produk.diskon_tipe = row.tipe_diskon;
			}
		}
		$scope.setDiskonVarian();
	}
	$scope.submitFormProduk = function () {
		var data_param = {};
			data_param['action'] = ($scope.data_form_produk.action)?$scope.data_form_produk.action:"addProduk";
			data_param['data_user'] = $rootScope.session_user;
			data_param['data_produk'] = $scope.data_form_produk;
			//console.log(JSON.stringify(data_param));
		
		$http({
			method: 'POST',
			url: BASE_URL + 'API/services.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param({data_param:encObjParam(data_param)}),
			beforeSend: function() {
				//modal.show()
			},
			complete: function(response) {
				var response = response.data;
				if(response.message != "") alert(response.message);
				if(response.message != "Nama sudah terdaftar!"){
					$scope.data_form_produk = {};
					angular.element(document.querySelector('#modalFormProduk')).modal('hide');
				}
				$scope.loadDataProduk();
			}
		});
		
	}
	$scope.addProduk = function () {
		//console.log(data_produk);
		$scope.data_form_produk = {}
		$scope.data_form_produk.action = 'addProduk';
		$scope.data_form_produk.aktif = '1';
		$scope.data_form_produk.tanggal = new Date();
		$scope.data_form_produk.harga = 0;
		$scope.data_form_produk.diskon = 0;
		$scope.data_form_produk.diskon_tipe = 'persen';
		$scope.data_form_produk.data_varian = [{stok_status:'tersedia', harga_jual:0, diskon:0}];
		$scope.data_form_produk.data_grosir = [{},{},{},{},{}];
		//bagian ini di buat otomatis pribadi karena belum dibutuhkan pengiriman suplier
		$scope.data_form_produk.sumber_stok = 'pribadi';
		$scope.data_form_produk.id_suplier = "";
		$scope.data_form_produk.pengirim_produk = "pribadi";

		angular.element(document.querySelector("#modalFormProduk")).on('shown.bs.modal', function (e) {
			setTimeout(function(){
				angular.element(document.querySelector("#modalFormProduk img")).attr("src","data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16ba5f6da00%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16ba5f6da00%22%3E%3Crect%20width%3D%22200%22%20height%3D%22200%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2274.421875%22%20y%3D%22104.5%22%3ENone%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E");
			}, 300);
		});
		angular.element(document.querySelector('#modalFormProduk')).modal('show');
	}
	$scope.updateProduk = function (data_produk) {
		//console.log(data_produk);
		/**/
		$scope.data_form_produk = data_produk;
		$scope.data_form_produk.action = "updateProduk";
		//$scope.data_form_produk.tanggal = new Date($scope.data_form_produk.tanggal);
		$scope.data_form_produk.harga = 0;
		$scope.data_form_produk.diskon = 0;
		$scope.data_form_produk.stat_varian = ($scope.data_form_produk.stat_varian == "1")?true:false;
		$scope.data_form_produk.stat_habis = ($scope.data_form_produk.stat_habis == "1")?true:false;
		$scope.data_form_produk.grosir_qty = ($scope.data_form_produk.stat_grosir_qty == "1")?true:false;
		for(i in $scope.data_form_produk.data_varian){
			$scope.data_form_produk.data_varian[i].stat_hanya_foto = ($scope.data_form_produk.data_varian[i].stat_hanya_foto == "1")?true:false;
			$scope.data_form_produk.data_varian[i].berat = parseInt($scope.data_form_produk.data_varian[i].berat);
			$scope.data_form_produk.data_varian[i].harga_beli = parseInt($scope.data_form_produk.data_varian[i].harga_beli);
			$scope.data_form_produk.data_varian[i].harga_jual = parseInt($scope.data_form_produk.data_varian[i].harga_jual);
			$scope.data_form_produk.data_varian[i].diskon = parseInt($scope.data_form_produk.data_varian[i].diskon);
			$scope.data_form_produk.data_varian[i].stok = parseInt($scope.data_form_produk.data_varian[i].stok);
		}
		//console.log($scope.data_form_produk.data_grosir);
		for(i in $scope.data_form_produk.data_grosir){
			$scope.data_form_produk.data_grosir[i].rentang_mulai = parseInt($scope.data_form_produk.data_grosir[i].qty_awal);
			$scope.data_form_produk.data_grosir[i].rentang_akhir = parseInt($scope.data_form_produk.data_grosir[i].qty_akhir);
			$scope.data_form_produk.data_grosir[i].harga_satuan = parseInt($scope.data_form_produk.data_grosir[i].harga_jual);
		}
		if($scope.data_form_produk.data_grosir == "0"){
			$scope.data_form_produk.data_grosir = [{},{},{},{},{}];
		}
		let data_grosir_inc = (5-($scope.data_form_produk.data_grosir).length);
		for(var i = 0; i<data_grosir_inc; i++){
			$scope.data_form_produk.data_grosir.push({});
		}
		
		angular.element(document.querySelector("#modalFormProduk")).on('shown.bs.modal', function (e) {
			$empty_img = "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16ba5f6da00%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16ba5f6da00%22%3E%3Crect%20width%3D%22200%22%20height%3D%22200%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2274.421875%22%20y%3D%22104.5%22%3ENone%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E";
			setTimeout(function(){
				for(i in $scope.data_form_produk.data_varian){
					$foto = $scope.data_form_produk.data_varian[i].foto;
					if($foto != ""){
						$foto = BASE_URL+"assets/upload/produk/display/"+$scope.data_form_produk.data_varian[i].foto;
					}else{
						$foto = $empty_img;
					}
					angular.element(document.querySelector("#modalFormProduk img.display_foto_"+i)).attr("src",$foto);
				}
			}, 300);
		});
		angular.element(document.querySelector('#modalFormProduk')).modal('show');
	}
	$scope.deleteProduk = function (id_produk) {
		var c = confirm("Anda akan menghapus Produk ini?");
		if(c){
			var data_param = {};
				data_param['action'] = "deleteProduk";
				data_param['id_produk'] = id_produk;
			$http({
				method: 'POST',
				url: BASE_URL + 'API/services.php',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				data: $.param({data_param:encObjParam(data_param)}),
				beforeSend: function() {
					//modal.show()
				},
				complete: function(response) {
					var response = response.data;
					$scope.loadDataProduk();
					if(response.message != "") alert(response.message);
				}
			});
		}
	}
	$scope.sendJenisStok = function () {
		var sumber_stok = $scope.data_form_produk.sumber_stok;
		if(sumber_stok == "pribadi"){
			$scope.data_form_produk.id_suplier = "";
			$scope.data_form_produk.pengirim_produk = "pribadi";
		}
	}
	$scope.initLoad = function () {
		var x = new Date();
		var Y = x.getFullYear();
		var M = (x.getMonth() + 1);
		
		$scope.loadDataKategori();
		$scope.loadDataSuplier();
		$scope.loadFilterData();
		/*
		$scope.data_filter.date_type='by_month';
		$scope.data_filter.bulan=(M).toString();
		$scope.data_filter.tahun=(Y).toString();
		$scope.data_filter.tanggal_mulai = x;
		$scope.data_filter.tanggal_akhir = x;
		*/
	}
	$scope.initLoad();
});
app.controller('ctrlOrder', function($rootScope,$scope,$location,$http){
	$scope.indexInitLoad();
	$scope.breadcrumb = '<li class="breadcrumb-item"><a href="#!/order">Order</a></li>'+
						'<li class="breadcrumb-item active" aria-current="page">List</li>';

	$scope.datatables = null;
	$scope.data_table_order = {};
	$scope.data_order_checked = {};
	$scope.quick_report_order = {};
	$scope.modalUpdateResi = {};
	$scope.data_filter = {};
	$scope.selectedOrder = {};
	$scope.loadFilterData = function () {
		$scope.loadDataOrder($scope.data_filter);
		$scope.loadQuickReportOrder($scope.data_filter);
	}
	$scope.loadDataOrder = function (data_filter = null) {
		if($scope.datatables !== null){
			$scope.datatables.destroy();
			$scope.datatables = null;
		}
		var data_param = {};
			data_param['action'] = "loadDataOrder";
			data_param['data_user'] = $rootScope.session_user;
			data_param['data_filter'] = data_filter;
			//console.log(data_param);
		$http({
			method: 'POST',
			url: BASE_URL + 'API/services.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param({data_param:encObjParam(data_param)}),
			beforeSend: function() {
				//modal.show()
			},
			complete: function(response) {
				var response = response.data;
				//console.log(typeof(response.data));
				//console.log(response);
				if(typeof(response.data) == "object"){
					var res = response.data;
					for(i in res){
						res[i].total_belanja = parseInt(res[i].total_belanja);
						res[i].diskon_member = parseInt(res[i].diskon_member);
						res[i].diskon_order = parseInt(res[i].diskon_order);
						res[i].total_ongkir = parseInt(res[i].total_ongkir);
						res[i].list_nama_barang = "- " + (res[i].list_nama_barang).toString().replace(/\|/gi, '\n\r- ');
					}
					$scope.data_table_order = res;
				}else{
					$scope.data_table_order = {};
				}
				
				setTimeout(function(){
					$scope.datatables = angular.element(document.querySelector('.table#dataTable')).DataTable({
						destroy: true
					});
				}, 1000);
				
			}
		});		
	}
	$scope.loadQuickReportOrder = function (data_filter = null) {
		$scope.quick_report_order['belum_bayar'] = 0;
		$scope.quick_report_order['belum_diproses'] = 0;
		$scope.quick_report_order['belum_ada_resi'] = 0;
		$scope.quick_report_order['proses_pengiriman'] = 0;
		$scope.quick_report_order['pengiriman_berhasil'] = 0;
		$scope.quick_report_order['sedang_diproses'] = 0;
		
		var data_param = {};
			data_param['action'] = "loadQuickReportOrder";
			data_param['data_user'] = $rootScope.session_user;
			data_param['data_filter'] = data_filter;
			//console.log(data_param);
		
		$http({
			method: 'POST',
			url: BASE_URL + 'API/services.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param({data_param:encObjParam(data_param)}),
			beforeSend: function() {
				//modal.show()
			},
			complete: function(response) {
				var response = response.data;
				//console.log(response);
				if(typeof(response) == "object"){
					var res = response;
					$scope.quick_report_order['belum_bayar'] = parseInt(res.belum_bayar);
					$scope.quick_report_order['belum_diproses'] = parseInt(res.belum_diproses);
					$scope.quick_report_order['belum_ada_resi'] = parseInt(res.belum_ada_resi);
					$scope.quick_report_order['proses_pengiriman'] = parseInt(res.proses_pengiriman);
					$scope.quick_report_order['pengiriman_berhasil'] = parseInt(res.pengiriman_berhasil);
					$scope.quick_report_order['sedang_diproses'] = parseInt(res.sedang_diproses);
				}else{
					$scope.quick_report_order = {};
				}
			}
		});
	}
	$scope.deleteOrder = function (id_order) {
		var c = confirm("Anda akan menghapus Order ini?");
		if(c){
			var data_param = {};
				data_param['action'] = "deleteOrder";
				data_param['id_order'] = id_order;
			$http({
				method: 'POST',
				url: BASE_URL + 'API/services.php',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				data: $.param({data_param:encObjParam(data_param)}),
				beforeSend: function() {
					//modal.show()
				},
				complete: function(response) {
					var response = response.data;
					$scope.loadFilterData();
					if(response.message != "") alert(response.message);
				}
			});
		}
	}
	$scope.updateResi = function (x){
		$scope.modalUpdateResi = {id_order:x.id, nama_pemesan:x.nama_pemesan, no_resi:x.no_resi};
		angular.element(document.querySelector('#modalUpdateResi')).modal('show');
		angular.element(document.querySelector("#modalUpdateResi")).on('hidden.bs.modal', function (e) {
			$scope.modalUpdateResi = {};
		})
	}
	$scope.updateResiSave = function (){
		//console.log($scope.modalUpdateResi);
			var modalUpdateResi = $scope.modalUpdateResi;
			var data_param = {};
				data_param['action'] = "updateResi";
				data_param['data_user'] = $rootScope.session_user;
				data_param['id_order'] = modalUpdateResi.id_order;
				data_param['no_resi'] = modalUpdateResi.no_resi;
			$http({
				method: 'POST',
				url: BASE_URL + 'API/services.php',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				data: $.param({data_param:encObjParam(data_param)}),
				beforeSend: function() {
					//modal.show()
				},
				complete: function(response) {
					var response = response.data;
					if(response.message != "") alert(response.message);
					angular.element(document.querySelector('#modalUpdateResi')).modal('hide');
					$scope.loadFilterData();
				}
			});
	}
	$scope.updateStatusBayar = function (x){
		var c = confirm("Anda akan merubah status bayar order ini?");
		if(c){
			var new_status_bayar = "";
			if(x.status_bayar == "sudah"){
				new_status_bayar = "belum";
			}else if(x.status_bayar == "belum"){
				new_status_bayar = "sudah";
			}
			var data_param = {};
				data_param['action'] = "updateStatusBayar";
				data_param['data_user'] = $rootScope.session_user;
				data_param['id_order'] = x.id;
				data_param['status_bayar'] = new_status_bayar;
			$http({
				method: 'POST',
				url: BASE_URL + 'API/services.php',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				data: $.param({data_param:encObjParam(data_param)}),
				beforeSend: function() {
					//modal.show()
				},
				complete: function(response) {
					var response = response.data;
					if(response.message != "") alert(response.message);
					$scope.loadFilterData();
				}
			});
		}
	}
	$scope.printAllOrder = function () {
		var data_order_checked = $scope.data_order_checked;
		var data_check = [];
		for(i in data_order_checked){
			let stat_checked = data_order_checked[i];
			let id_order = i;
			if(stat_checked === true){
				data_check.push(id_order);
			}
		}
		//console.log(data_check);
		if(data_check.length > 0){
			$scope.printOrder(data_check);
		}else{
			alert("Silahkan checklist terlebih dahulu data yang akan di print!");
		}
	}
	$scope.orderCheckedAll = function () {
		//console.log($rootScope.data_profile.width_print_page);
		var data_order_checked = $scope.data_order_checked;
		$scope.data_order_checked = {};
		for(i in data_order_checked){
			let stat_checked = data_order_checked[i];
			let id_order = i;
			$scope.data_order_checked[id_order] = !$scope.data_order_checked_all;
		}
	}
	$scope.viewMobileOrder = function (param) {
		var id_order = param.id_order;
		$scope.vmo_kode_order = $scope.kodeOrder(id_order);
		$scope.vmo_id_order = id_order;
		$scope.data_mobile_order = {};
		$scope.total_belanja = 0;
		$scope.total_item = 0;
		$scope.total_berat = 0;
		$scope.harus_dibayar = 0;
		$scope.nama_membership = null;
		$scope.label_nilai_diskon_membership = 0;
		
		angular.element(document.querySelector('#modalViewMobileOrder')).modal('show');
		angular.element(document.querySelector("#modalViewMobileOrder")).on('hidden.bs.modal', function (e) {
			$scope.vmo_id_order = 0;
			$scope.data_mobile_order = {};
			$scope.total_belanja = 0;
			$scope.total_item = 0;
			$scope.total_berat = 0;
			$scope.harus_dibayar = 0;
			$scope.nama_membership = null;
			$scope.label_nilai_diskon_membership = 0;
		});
		
		var data_param = {};
			data_param['action'] = "viewMobileOrder";
			data_param['id_order'] = id_order;
		$http({
			method: 'POST',
			url: BASE_URL + 'API/services.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param({data_param:encObjParam(data_param)}),
			beforeSend: function() {
				//modal.show()
			},
			complete: function(response) {
				console.log(response.data);
				$scope.data_mobile_order.tb_order = response.data.tb_order.data[0];
				$scope.data_mobile_order.tb_order_cart = response.data.tb_order_cart.data;
				$scope.data_mobile_order.tb_order_cart_grosir = response.data.tb_order_cart_grosir.data;
				$scope.data_mobile_order.tb_order_customer = response.data.tb_order_customer.data[0];
				$scope.data_mobile_order.tb_order_suplier = response.data.tb_order_suplier.data[0];
				$scope.data_mobile_order.tb_order_suplier.biaya_kirim = parseInt($scope.data_mobile_order.tb_order_suplier.biaya_kirim);
				
				
				var toc = $scope.data_mobile_order.tb_order_cart;
				for(x in toc){
					let xtoc = toc[x];
					
					xtoc.cart_harga_jual_real = parseInt(xtoc.cart_harga_jual);
					if(xtoc.diskon_tipe == "persen"){
						xtoc.cart_harga_jual_real = xtoc.cart_harga_jual_real - (xtoc.cart_harga_jual_real * parseInt(xtoc.diskon)/100);
					}else if(xtoc.diskon_tipe == "nilai"){
						xtoc.cart_harga_jual_real = xtoc.cart_harga_jual_real - parseInt(xtoc.diskon);
					}

					$scope.data_mobile_order.tb_order_cart[x].cart_harga_jual_real = xtoc.cart_harga_jual_real;
					
					
					$scope.total_belanja = $scope.total_belanja + (parseInt(xtoc.cart_harga_jual_real) * parseInt(xtoc.cart_qty));
					$scope.total_item = $scope.total_item + parseInt(xtoc.cart_qty);
					$scope.total_berat = $scope.total_berat + (parseInt(xtoc.cart_berat) * parseInt(xtoc.cart_qty));
				}
				
				$scope.nama_membership = $scope.data_mobile_order.tb_order_customer.membership;
				var nilai_diskon_membership = 0;
				if($scope.data_mobile_order.tb_order_customer.diskon_tipe == "persen"){
					nilai_diskon_membership = $scope.total_belanja * $scope.data_mobile_order.tb_order_customer.diskon_nilai/100;
					$scope.label_nilai_diskon_membership = $scope.data_mobile_order.tb_order_customer.diskon_nilai+"%";
				}else if($scope.data_mobile_order.tb_order_customer.diskon_tipe == "nilai"){
					nilai_diskon_membership = $scope.data_mobile_order.tb_order_customer.diskon_nilai;
					$scope.label_nilai_diskon_membership = $scope.formatRupiah($scope.data_mobile_order.tb_order_customer.diskon_nilai);
				}
				$scope.harus_dibayar = $scope.total_belanja - nilai_diskon_membership;
			}
		});
	}
	$scope.updateMobileOrder = function () {
		var id_user = $rootScope.session_user.id;
		var id_order = $scope.data_mobile_order.tb_order.id;
		var status_order = $scope.data_mobile_order.tb_order.status_order;
		var biaya_kirim = $scope.data_mobile_order.tb_order_suplier.biaya_kirim;
		var total_berat = Math.round($scope.total_berat/1000);
		var total_ongkir = biaya_kirim * total_berat;
		//console.log(id_order);
		//console.log(status_order);
		//console.log(biaya_kirim);
		//console.log($scope.total_berat);
		var data_param = {};
			data_param['action'] = "updateMobileOrder";
			data_param['id_user'] = id_user;
			data_param['id_order'] = id_order;
			data_param['status_order'] = status_order;
			data_param['biaya_kirim'] = biaya_kirim;
			data_param['total_ongkir'] = total_ongkir;
		$http({
			method: 'POST',
			url: BASE_URL + 'API/services.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param({data_param:encObjParam(data_param)}),
			beforeSend: function() {
				//modal.show()
			},
			complete: function(response) {
				if(response.data.tb_order == 1 && response.data.tb_order_suplier == 1){
					alert("Update order berhasil!");
				}
			}
		});
	}
	$scope.initLoad = function () {
		var x = new Date();
		var Y = x.getFullYear();
		var M = (x.getMonth() + 1);
		
		$scope.data_filter.date_type='by_month';
		$scope.data_filter.bulan=(M).toString();
		$scope.data_filter.tahun=(Y).toString();
		$scope.data_filter.tanggal_mulai = x;
		$scope.data_filter.tanggal_akhir = x;
		
		let appPageParam = $rootScope.appPageParam;
		if(typeof(appPageParam.action) != "undefined" && appPageParam.action == "loadDataOrderByFilter"){
			let data_filter = appPageParam['data_filter'];
			$scope.data_filter.date_type = data_filter.date_type;
			$scope.data_filter.bulan = data_filter.bulan;
			$scope.data_filter.tahun = data_filter.tahun;
			$scope.data_filter.tanggal_mulai = data_filter.tanggal_mulai;
			$scope.data_filter.tanggal_akhir = data_filter.tanggal_akhir;
		}
		//$scope.loadDataKategori();
		$scope.loadFilterData();
	}
	$scope.initLoad();
});
app.controller('ctrlOrderForm', function($rootScope,$scope,$location,$http){
	$scope.indexInitLoad();
	$scope.breadcrumb = '<li class="breadcrumb-item"><a href="#!/order">Order</a></li>'+
						'<li class="breadcrumb-item active" aria-current="page">Transaction</li>';
	$scope.titlePage = 'Transaction';
	$scope.data_form_order = {};
	$scope.product_cart = [];
	$scope.product_cart_suplier = [];
	$scope.data_customer_by_name = [];
	$scope.data_product_by_name = [];
	$scope.loading_get_product = false;
	$scope.loading_get_customer = false;
	$scope.board_get_customer = false;
	
	$scope.changeModeInputBarang = function(){
		var mode_input_barang = $scope.data_form_order.mode_input_barang;
		var product_cart = $scope.product_cart;
		var cek_stat_new_produk = false;
		for(i in product_cart){
			let row = product_cart[i];
			let stat_new_produk = row['stat_new_produk'];
			if(stat_new_produk === true){
				cek_stat_new_produk = true;
			}
		}
		if(mode_input_barang === false && cek_stat_new_produk === true){
			var c = confirm("Menonaktifkan mode ini maka semua produk dengan mode insert akan di hapus!");
			if(c){
				var cart = $scope.product_cart;
				var cart_n = [];
				for(i in cart){
					let row = cart[i];
					if(row['stat_new_produk'] === false){
						cart_n.push(row);
					}
				}
				$scope.product_cart = cart_n;
				$scope.createGroupProdukSuplier();
			}else{
				$scope.data_form_order.mode_input_barang = true;
			}
		}
	}
	$scope.setDiskonOrderNilai = function(total_belanja){
		var diskon_order_tipe = $scope.data_form_order.diskon_order_tipe
		var diskon_order_input = $scope.data_form_order.diskon_order_input
		if(diskon_order_tipe == 'nilai'){
			$scope.data_form_order.diskon_order_nilai = diskon_order_input;
		}else if(diskon_order_tipe == 'persen'){
			$scope.data_form_order.diskon_order_nilai = (total_belanja*diskon_order_input)/100;
		}else{
			$scope.data_form_order.diskon_order_nilai = 0;
		}
	}
	$scope.changeDiskonOrderTipe = function(){
		var diskon_order_tipe = $scope.data_form_order.diskon_order_tipe;
		var diskon_order_input = 0;
		switch(diskon_order_tipe){
			case "":
				diskon_order_input = 0;
			break;
			case "nilai":
				diskon_order_input = "";
			break;
			case "persen":
				diskon_order_input = "";
			break;
		}
		$scope.data_form_order.diskon_order_input = diskon_order_input;
		angular.element(document.querySelector('#diskon_order_input')).focus();
	}
	$scope.getGrandTotalOngkir = function(){
		var exp = $scope.data_form_order.expedisi;
		var total_ongkir = 0;
		for(indx in exp){
			let i = indx;
			//        total_ongkir += (parseInt($scope.data_form_order.biaya_kirim[i])*(parseInt($scope.data_form_order.berat[i])/1000));
			total_ongkir += (parseInt($scope.data_form_order.biaya_kirim[i])*Math.ceil((parseInt($scope.data_form_order.berat[i])/1000)));
		}
		return total_ongkir;
	}
	$scope.getGrandTotal = function(tipe, cart){
		var tQty = 0;
		var tHarga = 0;
		var tBerat = 0;
		for(i in cart){
			let row = cart[i];
			tQty += parseInt(row['cart_qty']);
			tHarga += ((row['cart_harga_jual']- $scope.getValueDiskon(row['cart_harga_jual'], row['diskon'], row['diskon_tipe'])) * row['cart_qty']);
			tBerat += (parseInt(row['berat']) * parseInt(row['cart_qty']));
		}
		if(tipe == 'qty'){
			return tQty;
		}else if(tipe == 'harga'){
			return tHarga;
		}else if(tipe == 'berat'){
			return tBerat;
		}else if(tipe == 'harga_n_diskon'){
			let diskon_membership = 0;
			let diskon_tipe = (typeof($scope.data_form_order.customer.diskon_tipe) == "undefined")?"":$scope.data_form_order.customer.diskon_tipe;
			let diskon_nilai = (typeof($scope.data_form_order.customer.diskon_nilai) == "undefined")?0:parseInt($scope.data_form_order.customer.diskon_nilai);
			if(diskon_tipe == 'persen'){
				diskon_membership = (tHarga*diskon_nilai)/100;
			}else if(diskon_tipe == 'nilai'){
				diskon_membership = diskon_nilai;
			}
			return (tHarga - diskon_membership - $scope.data_form_order.diskon_order_nilai);
		}
	}
	$scope.getSubTotal = function(xsup, tipe, cart, pengirim_produk, id_suplier){
		var tQty = 0;
		var tHarga = 0;
		var tBerat = 0;
		for(i in cart){
			let row = cart[i];
			if(pengirim_produk == 'pribadi' && pengirim_produk == row['pengirim_produk']){
					tQty += parseInt(row['cart_qty']);
					tHarga += ((row['cart_harga_jual']- $scope.getValueDiskon(row['cart_harga_jual'], row['diskon'], row['diskon_tipe'])) * row['cart_qty']);
					tBerat += (parseInt(row['cart_berat']) * parseInt(row['cart_qty']));
			}else if(pengirim_produk == 'suplier' && pengirim_produk == row['pengirim_produk'] && id_suplier == row['id_suplier']){
					tQty += parseInt(row['cart_qty']);
					tHarga += ((row['cart_harga_jual']- $scope.getValueDiskon(row['cart_harga_jual'], row['diskon'], row['diskon_tipe'])) * row['cart_qty']);
					tBerat += (parseInt(row['cart_berat']) * parseInt(row['cart_qty']));
			}
		}
		if(tipe == 'qty'){
			return tQty;
		}else if(tipe == 'harga'){
			return tHarga;
		}else if(tipe == 'berat'){
			$scope.data_form_order.berat[xsup] = tBerat;
			return tBerat;
		}
	}
	$scope.openModalGrosir = function(nama_barang, harga_grosir){
		var modalBody = "";
		for(i in harga_grosir){
			let r = harga_grosir[i];
			let qty_awal = r['qty_awal'];
			let qty_akhir = (parseInt(r['qty_akhir']) == 0)?"~":r['qty_akhir'];
			let harga_jual = r['harga_jual'];
			modalBody += qty_awal+" Qty&nbsp;&nbsp;&nbsp;s/d&nbsp;&nbsp;&nbsp;"+qty_akhir+" Qty = "+$scope.formatRupiah(harga_jual)+"<br />";
		}
		angular.element(document.querySelector('.modal-grosir .nama-produk')).text(nama_barang);
		angular.element(document.querySelector('.modal-grosir .modal-body')).html(modalBody);
		angular.element(document.querySelector('.modal-grosir')).modal('show');
	}
	$scope.changeOngkir = function(){
		var exp = $scope.data_form_order.expedisi;
		for(indx in exp){
			let i = indx;
			if($scope.data_form_order.expedisi[i] == "custom"){
				//console.log($scope.data_form_order);
				//$scope.data_form_order.expedisi_service[i] = "-";
				//$scope.data_form_order.biaya_kirim[i] = 0;
				$scope.data_form_order.total_ongkir[i] = (parseInt($scope.data_form_order.biaya_kirim[i])*Math.ceil((parseInt($scope.data_form_order.berat[i])/1000)));
			}else{
				$scope.data_form_order.biaya_kirim[i] = 0;
				$scope.data_form_order.total_ongkir[i] = (parseInt($scope.data_form_order.biaya_kirim[i])*Math.ceil((parseInt($scope.data_form_order.berat[i])/1000)));
			}
		}
	}
	$scope.changeCartQty = function(indx, x){
		//console.log(indx);
		let cart_qty = parseInt(x.cart_qty);
		let pengirim_produk = x.pengirim_produk;
		let stok = parseInt(x.stok);
		var ret = true;
		if(isNaN(cart_qty) == true || cart_qty < 1){
			$scope.product_cart[indx].cart_qty = 1;
			alert("Qty min 1");
			ret = false;
		}
		if(pengirim_produk == "pribadi" && cart_qty > stok){
			$scope.product_cart[indx].cart_qty = stok;
			alert("Qty max stok "+stok);
			ret = false;
		}
		let cart_qty_n = $scope.product_cart[indx].cart_qty;
		if(x.harga_grosir != null && x.harga_grosir.length > 0){
			let grosir = x.harga_grosir;
			$scope.product_cart[indx].cart_harga_jual = parseInt($scope.product_cart[indx].harga_jual);
			for(i in grosir){
				let row = grosir[i];
				let qty_awal = parseInt(row['qty_awal']);
				let qty_akhir = parseInt(row['qty_akhir']);
				let harga_jual = parseInt(row['harga_jual']);
				if(qty_akhir > 0){
					if(cart_qty_n >= qty_awal && cart_qty_n <= qty_akhir){
						$scope.product_cart[indx].cart_harga_jual = harga_jual;
					}
				}else{
					if(cart_qty_n >= qty_awal){
						$scope.product_cart[indx].cart_harga_jual = harga_jual;
					}
				}
			}
		}
		return ret;
		//console.log((x.harga_grosir).length);
	}
	$scope.createGroupProdukSuplier = function(){
		var cart = $scope.product_cart;
		var produk_ada = 0;
		$scope.product_cart_suplier = [];
		if(cart.length > 0){
			let suplier = null;
			for(i in cart){
				let item = cart[i];
				let pengirim_produk = '{"pengirim_produk":"'+item['pengirim_produk']+'", "pengirim_produk_kota":"", "pengirim_produk_id":""}';
				
				if(item['pengirim_produk'] == "suplier"){
					pengirim_produk = '{"pengirim_produk":"suplier", "pengirim_produk_kota":"'+item['pengirim_produk_kota']+'", "pengirim_produk_id":"'+((item['id_suplier']).toString())+'"}';
				}
				
				if($scope.product_cart_suplier.includes(pengirim_produk) === false){
					$scope.product_cart_suplier.push(pengirim_produk);
				}
			}
		}
		//console.log(cart);
		//console.log($scope.product_cart_suplier);
	}
	$scope.tambahNInsertProdukKeCart = function(nama_produk_baru){
		var new_item = {};
			new_item['aktif'] = "1";
			new_item['berat'] = 0;
			new_item['cart_berat'] = 0;
			new_item['cart_harga_jual'] = 0;
			new_item['cart_qty'] = 1;
			new_item['created_by'] = null;
			new_item['deskripsi'] = "Deskripsi "+nama_produk_baru;
			new_item['diskon'] = 0;
			new_item['diskon_tipe'] = "persen";
			new_item['foto'] = "";
			new_item['hapus'] = "0";
			new_item['harga_beli'] = 0;
			new_item['harga_grosir'] = null;
			new_item['harga_jual'] = 0;
			new_item['id'] = Math.floor(Math.random() * 10000);
			new_item['id_kategori'] = Math.floor(Math.random() * 10000);
			new_item['id_produk'] = Math.floor(Math.random() * 10000);
			new_item['id_suplier'] = Math.floor(Math.random() * 10000);
			new_item['id_user_owner'] = Math.floor(Math.random() * 10000);
			new_item['id_varian'] = Math.floor(Math.random() * 10000);
			new_item['kode'] = Math.floor(Math.random() * 10000);
			new_item['nama_barang'] = nama_produk_baru;
			new_item['nama_varian'] = "";
			new_item['pengirim_produk'] = "pribadi";
			new_item['pengirim_produk_kota'] = "";
			new_item['stat_grosir_qty'] = 0;
			new_item['stat_varian'] = 0;
			new_item['stok'] = 0;
			new_item['stok_status'] = "";
			new_item['sumber_stok'] = "pribadi";
			new_item['updated_by'] = null;
			new_item['stat_new_produk'] = true;
		$scope.product_cart.push(new_item);
		$scope.createGroupProdukSuplier();
		
		$scope.data_form_order.cari_produk = "";
		$scope.data_product_by_name = [];
		angular.element(document.querySelector('#cari_produk')).focus();
	}
	$scope.tambahProdukKeCart = function(x){
		//console.log(x);
		var cart = $scope.product_cart;
		var produk_ada = 0;
		if(x.pengirim_produk == 'suplier' && x.stok_status == 'habis'){
			alert("Produk ini tidak tersedia di suplier!");
		}else if(x.pengirim_produk == 'pribadi' && parseInt(x.stok) == 0){
			alert("Stok produk ini 0!");
		}else{
			if(cart.length > 0){
				for(i in cart){
					let new_item = x;
					if(new_item['id_produk'] == cart[i]['id_produk']  && new_item['id_varian'] == cart[i]['id_varian']){
						cart[i]['cart_qty'] = parseInt(cart[i]['cart_qty'])+1;
						produk_ada = 1;
					}
				}
				$scope.product_cart = cart;
			}
			
			if(produk_ada == 0){
				let new_item = x;
				for(col in new_item){
					new_item['cart_qty'] = 1;
					new_item['cart_harga_jual'] = parseInt(new_item['harga_jual']);
					new_item['cart_berat'] = parseInt(new_item['berat']);
					new_item['harga_grosir'] = null;
					new_item['stat_new_produk'] = false;
				}
				$scope.product_cart.push(new_item);

				var data_param = {};
					data_param['action'] = "getProdukGrosir";
					data_param['data_user'] = $rootScope.session_user;
					data_param['data_filter'] = {id_produk:x.id_produk};
				$http({
					method: 'POST',
					url: BASE_URL + 'API/services.php',
					headers: {'Content-Type': 'application/x-www-form-urlencoded'},
					data: $.param({data_param:encObjParam(data_param)}),
					beforeSend: function() {
						//modal.show()
					},
					complete: function(response) {
						var response = response.data;
						//console.log(typeof(response.data));
						//console.log(response.data);
						if(typeof(response.data) == "object"){
							var cart = $scope.product_cart;
							if(cart.length > 0){
								for(i in cart){
									let new_item = x;
									if(new_item['id_produk'] == cart[i]['id_produk']  && new_item['id_varian'] == cart[i]['id_varian']){
										cart[i]['harga_grosir'] = response.data;
									}
								}
								$scope.product_cart = cart;
							}
						}
						$scope.createGroupProdukSuplier();
					}
				});
			}

			//console.log($scope.product_cart);
			//console.log(x);
			$scope.data_form_order.cari_produk = "";
			$scope.data_product_by_name = [];
			angular.element(document.querySelector('#cari_produk')).focus();
		}
	}
	$scope.deleteCartProduk = function(id_produk,id_varian){
		var c = confirm("anda akan menghapus produk ini ?");
		if(c){
			var cart = $scope.product_cart;
			var cart_n = [];
			for(i in cart){
				let row = cart[i];
				if(row['id_produk'] != id_produk || row['id_varian'] != id_varian){
					cart_n.push(row);
				}
			}
			$scope.product_cart = cart_n;
			$scope.createGroupProdukSuplier();
			//console.log($scope.product_cart);
		}
	}
	$scope.getProductByName = function(){
		var cari_produk = $scope.data_form_order.cari_produk;
		if(typeof(cari_produk) != "undefined" && cari_produk != "" && cari_produk.length > 2){
			var data_param = {};
				data_param['action'] = "getProductByName";
				data_param['data_user'] = $rootScope.session_user;
				data_param['data_filter'] = {nama_barang:cari_produk, aktif:'1'};
			$http({
				method: 'POST',
				url: BASE_URL + 'API/services.php',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				data: $.param({data_param:encObjParam(data_param)}),
				beforeSend: function() {
					$scope.loading_get_product = true;
				},
				complete: function(response) {
					var response = response.data;
					//console.log(typeof(response.data));
					//console.log(response.data);
					if(typeof(response.data) == "object"){
						$scope.data_product_by_name = response.data;
					}else{
						$scope.data_product_by_name = [];
					}
					$scope.loading_get_product = false;
				}
			});
		}else{
			$scope.data_product_by_name = [];
		}
	}
	$scope.pilihCustomer = function(x){
		//console.log(x);
		$scope.data_form_order.customer = x;
		$scope.data_form_order.id_customer = x.id;
		$scope.data_form_order.nama_pemesan = x.nama_lengkap;
		$scope.data_form_order.alamat_tujuan = x.id_propinsi+", "+x.id_kabupaten+", "+x.id_kecamatan+", "+x.id_kelurahan+" ("+x.kode_pos+") \n"+x.alamat_lengkap;
		$scope.data_customer_by_name = [];
		$scope.board_get_customer = false;
	}
	$scope.getCustomerByName = function(){
		$scope.data_form_order.customer = [];
		$scope.data_form_order.alamat_tujuan = "";
		var nama_pemesan = $scope.data_form_order.nama_pemesan;
		if(nama_pemesan != "" && nama_pemesan.length > 2){
			var data_param = {};
				data_param['action'] = "getCustomerByName";
				data_param['data_user'] = $rootScope.session_user;
				data_param['data_filter'] = {nama_pemesan:nama_pemesan, aktif:'1'};
			$http({
				method: 'POST',
				url: BASE_URL + 'API/services.php',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				data: $.param({data_param:encObjParam(data_param)}),
				beforeSend: function() {
					$scope.loading_get_customer = true;
				},
				complete: function(response) {
					var response = response.data;
					//console.log(typeof(response.data));
					//console.log(response.data);
					if(typeof(response.data) == "object"){
						$scope.data_customer_by_name = response.data;
					}else{
						$scope.data_customer_by_name = [];
					}
					$scope.loading_get_customer = false;
				}
			});
		}else{
			$scope.data_customer_by_name = [];
		}
		$scope.board_get_customer = true;		
	}
	$scope.submitFormOrder = function () {
		angular.element(document.querySelector('.modal-confirm-order')).modal('show');
	}
	$scope.calcTransaksi = function (){
		 $scope.data_form_order.transaksi_tagihan = ($scope.getGrandTotal('harga_n_diskon', $scope.product_cart)+$scope.getGrandTotalOngkir()); 
		 $scope.data_form_order.transaksi_kembalian = ($scope.data_form_order.transaksi_dibayar-($scope.getGrandTotal('harga_n_diskon', $scope.product_cart)+$scope.getGrandTotalOngkir()));
		 
		 //data_form_order.transaksi_tagihan = (getGrandTotal('harga_n_diskon', product_cart)+getGrandTotalOngkir()); 
		 //data_form_order.transaksi_kembalian = (data_form_order.transaksi_dibayar-(getGrandTotal('harga_n_diskon', product_cart)+getGrandTotalOngkir()));
	}
	$scope.saveFormOrder = function(stat_print){
		$scope.calcTransaksi();
		let data_form_order = JSON.stringify($scope.data_form_order);
		let product_cart_suplier = JSON.stringify($scope.product_cart_suplier);
		let product_cart = JSON.stringify($scope.product_cart);

		var data_param = {};
			data_param['action'] = ($scope.data_form_order.action)?$scope.data_form_order.action:"addOrder";
			data_param['data_user'] = $rootScope.session_user;
			data_param['data_form_order'] = data_form_order;
			data_param['product_cart_suplier'] = product_cart_suplier;
			data_param['product_cart'] = product_cart;
			//console.log(data_param);
			//console.log(JSON.stringify(data_param));
		
		$http({
			method: 'POST',
			url: BASE_URL + 'API/services.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param({data_param:encObjParam(data_param)}),
			beforeSend: function() {
				//modal.show()
			},
			complete: function(response) {
				var response = response.data;
				//console.log(response.result.id_order);
				if(stat_print == "print"){
					$scope.printOrder(response.result.id_order);
				}
				angular.element(document.querySelector('.modal-confirm-order')).modal('hide');
				$scope.loadViewNg('/order');
			}
		});
		
	}
	$scope.initLoad = function () {
		$scope.data_form_order = {}
		$scope.data_form_order.berat = {};
		$scope.data_form_order.biaya_kirim = {};
		$scope.data_form_order.total_ongkir = {};
		$scope.data_form_order.customer = {};
		
		$scope.data_form_order.action = "addOrder";
		$scope.data_form_order.tanggal_order = new Date();
		
		$scope.data_form_order.keterangan = '-';
		$scope.data_form_order.diskon_order_tipe = '';
		$scope.data_form_order.diskon_order_input = 0;
		$scope.data_form_order.status_bayar = 'belum';
		$scope.data_form_order.diskon_order_nilai = 0;
		$scope.data_form_order.status_order = 'Preparation In Progress';
		
		let appPageParam = $rootScope.appPageParam;
		if(typeof(appPageParam.action) != "undefined" && appPageParam.action == "updateOrder"){
			$scope.titlePage = 'Edit Transaction';
			var data_param = {};
				data_param['action'] = "loadDataOrderForUpdate";
				data_param['data_user'] = $rootScope.session_user;
				data_param['id_order'] = appPageParam.id_order;
			$http({
				method: 'POST',
				url: BASE_URL + 'API/services.php',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				data: $.param({data_param:encObjParam(data_param)}),
				beforeSend: function() {
					//modal.show()
				},
				complete: function(response) {
					var response = response.data;
					//console.log(response);
					var tb_order = response.tb_order;
					if(typeof(tb_order) == "object"){
						let data = tb_order[0];
						$scope.data_form_order = JSON.parse(atob(data.raw_order));
						$scope.product_cart_suplier = JSON.parse(atob(data.raw_suplier));
						$scope.product_cart = JSON.parse(atob(data.raw_cart));
						//console.log($scope.product_cart);
						$scope.data_form_order.tanggal_order = new Date($scope.data_form_order.tanggal_order);
						$scope.data_form_order.mode_input_barang = false;
					}
					$scope.data_form_order.action = appPageParam.action;
					$scope.data_form_order.id_order = appPageParam.id_order;
				}
			});
		}
	}
	$scope.initLoad();
});
app.controller('ctrlAffiliasi', function($rootScope,$scope,$location,$http){
	$scope.indexInitLoad();
	$scope.breadcrumb = '<li class="breadcrumb-item"><a href="#!/affiliasi">Affiliasi</a></li>'+
						'<li class="breadcrumb-item active" aria-current="page">List</li>';
	$scope.data_filter = {};
	$scope.data_affiliasi = {};
	$scope.link_affiliasi = BASE_URL+"?affiliasi="+$rootScope.session_user.id+"?/";
	
	$scope.loadFilterData = function () {
		$scope.loadDataAffiliasi($scope.data_filter);
	}
	$scope.loadDataAffiliasi = function (data_filter = null) {
		var data_param = {};
			data_param['action'] = "loadDataAffiliasi";
			data_param['data_user'] = $rootScope.session_user;
			data_param['data_filter'] = data_filter;
			//console.log(data_param);
		$http({
			method: 'POST',
			url: BASE_URL + 'API/services.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param({data_param:encObjParam(data_param)}),
			beforeSend: function() {
				//modal.show();
			},
			complete: function(response) {
				var response = response.data;
				//console.log(response.data);
				if(typeof(response.data) == "object"){
					var res = response.data;
					$scope.data_affiliasi = res;
				}else{
					$scope.data_affiliasi = {};
				}
				setTimeout(function(){
					angular.element(document.querySelector('.table#dataTable')).DataTable({destroy: true});
				}, 1000);
			}
		});
	}
	$scope.initLoad = function () {
		var x = new Date();
		var Y = x.getFullYear();
		var M = (x.getMonth() + 1);
		
		$scope.data_filter.date_type='by_month';
		$scope.data_filter.bulan=(M).toString();
		$scope.data_filter.tahun=(Y).toString();
		$scope.data_filter.tanggal_mulai = x;
		$scope.data_filter.tanggal_akhir = x;
		$scope.loadFilterData();
	}
	$scope.initLoad();
});
app.controller('ctrlSupport', function($rootScope,$scope,$location,$http){
	$scope.indexInitLoad();
	$scope.breadcrumb = '<li class="breadcrumb-item"><a href="#!/support">Support</a></li>'+
						'<li class="breadcrumb-item active" aria-current="page">Support Center</li>';
	$scope.data_filter = {};
	$scope.data_list_ticket = {};
	$scope.data_chat_history = {};
	$scope.data_support = {};
	$scope.data_support.form = {};
	
	$scope.addTicket = function () {
		var id_user = $rootScope.session_user.id;
		var kode_tiket_aktif = Math.floor(Math.random() * 1000000000) + 1;
		
		$scope.data_chat_history = {};
		
		$scope.data_support.kode_tiket_aktif = kode_tiket_aktif;
		$scope.data_support.disabled_form_tiket_baru = false;
		
		$scope.data_support.form.kode_tiket = kode_tiket_aktif;
		$scope.data_support.form.input_judul_readonly = false;
		$scope.data_support.form.input_judul = "";
		$scope.data_support.form.input_pesan = "";
		$scope.data_support.form.pembuat_pesan = id_user;
		$scope.data_support.form.id_user_penerima = "";
		
		setTimeout(function(){
			angular.element(document.querySelector('#input_judul')).focus();
		}, 300);		
	}
	$scope.cancelTicket = function () {
		$scope.data_chat_history = {};
		
		$scope.data_support.kode_tiket_aktif = "";
		$scope.data_support.disabled_form_tiket_baru = true;
		
		$scope.data_support.form.kode_tiket = "";
		$scope.data_support.form.input_judul_readonly = false;
		$scope.data_support.form.input_judul = "";
		$scope.data_support.form.input_pesan = "";
		$scope.data_support.form.pembuat_pesan = "";
		$scope.data_support.form.id_user_penerima = "";
	}
	$scope.sendChatTicket = function () {
		//console.log($scope.data_support);

		var data_param = {};
			data_param['action'] = ($scope.data_support.action)?$scope.data_support.action:"sendChatTicket";
			data_param['data_user'] = $rootScope.session_user;
			data_param['data_form_support'] = $scope.data_support.form;
			//console.log(data_param);
			//console.log(JSON.stringify(data_param));
		
		$http({
			method: 'POST',
			url: BASE_URL + 'API/services.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param({data_param:encObjParam(data_param)}),
			beforeSend: function() {
				//modal.show()
			},
			complete: function(response) {
				var response = response.data;
				//console.log(response);
				
				if($scope.data_support.form.input_judul_readonly == false) $scope.loadListTicket(true);
				
				$scope.data_support.form.input_judul_readonly = true;
				$scope.data_support.form.input_pesan = "";
				angular.element(document.querySelector('#input_pesan')).focus();
				$scope.loadHistoryChatTicket(true);
			}
		});
	}
	$scope.loadHistoryChatTicket = function (ping = null, loadList = null) {
		//console.log($scope.data_support);
		
		var data_param = {};
			data_param['action'] = "loadHistoryChatTicket";
			data_param['data_user'] = $rootScope.session_user;
			data_param['data_support'] = $scope.data_support;
			//console.log(data_param);
			//console.log(JSON.stringify(data_param));
		
		$http({
			method: 'POST',
			url: BASE_URL + 'API/services.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param({data_param:encObjParam(data_param)}),
			beforeSend: function() {
				//modal.show()
			},
			complete: function(response) {
				var response = response.data;
				//console.log(response);
				if(typeof(response.data) == "object"){
					var res = response.data;
					console.log(res);
					$scope.data_chat_history = res;
				}else{
					$scope.data_chat_history = {};
				}
				
				setTimeout(function(){
					var scrollHeight = angular.element(document.querySelector('#chat_history')).prop('scrollHeight');
					//angular.element(document.querySelector('#chat_history')).scrollTop(scrollHeight);
					angular.element(document.querySelector('#chat_history')).stop().animate({scrollTop:scrollHeight}, 1500, 'swing', function() { 
					   //alert("Finished animating");
					});
				}, 300);
				
				if(ping === true){
					$scope.sendPingToUser($scope.data_support.form.id_user_penerima);
				}
				if(loadList === true){
					$scope.loadListTicket();
				}
				$scope.loadNewTicketChat();
			}
		});
	}
	$scope.deleteChatTicket = function (data = null) {
		//console.log(data);
		var c = confirm("Yakin akan menghapus pesan ini?");
		if(c){
			var data_param = {};
				data_param['action'] = "deleteChatTicket";
				data_param['data_user'] = $rootScope.session_user;
				data_param['id_chat_ticket'] = data.id;
				//console.log(data_param);
				//console.log(JSON.stringify(data_param));
			
			$http({
				method: 'POST',
				url: BASE_URL + 'API/services.php',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				data: $.param({data_param:encObjParam(data_param)}),
				beforeSend: function() {
					//modal.show()
				},
				complete: function(response) {
					var response = response.data;
					//console.log(response);
					$scope.loadHistoryChatTicket(true);
				}
			});
		}
	}
	$scope.loadListTicket = function (activeFirst = null) {
		var data_param = {};
			data_param['action'] = "loadListTicket";
			data_param['data_user'] = $rootScope.session_user;
			data_param['data_support'] = $scope.data_support;
			//console.log(data_param);
			//console.log(JSON.stringify(data_param));
		
		$http({
			method: 'POST',
			url: BASE_URL + 'API/services.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param({data_param:encObjParam(data_param)}),
			beforeSend: function() {
				//modal.show()
			},
			complete: function(response) {
				var response = response.data;
				//console.log(response);
				if(typeof(response.data) == "object"){
					var res = response.data;
					$scope.data_list_ticket = res;
				}else{
					$scope.data_list_ticket = {};
				}
				setTimeout(function(){
					if(activeFirst === true){
						angular.element(document.querySelector('#list_tiket_0')).addClass("active");
					}
					if($scope.data_support.kode_tiket_aktif != ""){
						angular.element(document.querySelectorAll("[kode-tiket='"+$scope.data_support.kode_tiket_aktif+"']")).addClass("active");
					}
					if($scope.objLength($scope.data_list_ticket) > 0){
						//console.log($scope.data_list_ticket);
						let tdata = $scope.data_list_ticket;
						for(var i in tdata){
							let dibaca2 =  tdata[i]['dibaca2'];
							let kode_tiket =  tdata[i]['kode_tiket'];
							let penerima2 =  tdata[i]['penerima2'];
							if(dibaca2 == "0" && penerima2 == $rootScope.session_user.id){
								angular.element(document.querySelectorAll("[kode-tiket='"+kode_tiket+"']")).addClass("bg-warning");
								angular.element(document.querySelectorAll("[kode-tiket='"+kode_tiket+"']")).addClass("text-light");
							}
						}
					}
				}, 300);
			}
		});
	}
	$scope.pilihLIstTiket = function (indx, data) {
		setTimeout(function(){
			var id_user = $rootScope.session_user.id;
			var id_user_penerima = (data.pengirim.toString() != id_user.toString())?data.pengirim:data.penerima;
			
			$scope.data_support.disabled_form_tiket_baru = false;
			$scope.data_support.kode_tiket_aktif = data.kode_tiket;
			$scope.data_support.form.kode_tiket = data.kode_tiket;
			$scope.data_support.form.input_judul_readonly = true;
			$scope.data_support.form.input_judul = data.judul;
			$scope.data_support.form.input_pesan = "";
			$scope.data_support.form.pembuat_pesan = data.pembuat_pesan;
			$scope.data_support.form.id_user_penerima = id_user_penerima;
			angular.element(document.querySelector('#input_pesan')).focus();
			$scope.loadHistoryChatTicket(false, true);
			//console.log($scope.data_support.form);
		}, 300);
	}
	$scope.initLoad = function () {
		var x = new Date();
		var Y = x.getFullYear();
		var M = (x.getMonth() + 1);
		
		$scope.data_filter.date_type='by_month';
		$scope.data_filter.bulan=(M).toString();
		$scope.data_filter.tahun=(Y).toString();
		$scope.data_filter.tanggal_mulai = x;
		$scope.data_filter.tanggal_akhir = x;
		
		$scope.data_support.disabled_form_tiket_baru = true;
		$scope.data_support.kode_tiket_aktif = "";
		
		$scope.loadListTicket();
	}
	firebaseDB.ref('/tb_support_chat/' + $rootScope.session_user.id + '/ping').on('value', function(snapshot){
		$scope.loadListTicket();
		if($scope.data_support.kode_tiket_aktif != ""){
			//console.log(snapshot.val());
			$scope.loadHistoryChatTicket();
		}
	});
	$scope.initLoad();
});








