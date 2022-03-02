<?php
require_once("config.php");
require_once("library_function.php");
require_once( 'ssp.class.php' );

$table = 'vw_xdel_tmp';


$primaryKey = 'id';

$i = 1; 
//$_REQUEST['param']
//echo "<pre>"; print_r($_REQUEST); echo "</pre>"; die();

$columns = array(
    array( 'db' => 'id',				'dt' => 0, 'formatter' => function( $d, $row ) {
			return $GLOBALS['i']++;
        }
	),
	array( 'db' => 'id',				'dt' => 1 ),
    array( 'db' => 'nama_kategori',		'dt' => 2 ),
    array( 'db' => 'sumber_stok',		'dt' => 3 ),
    array( 'db' => 'nama_suplier',		'dt' => 4 ),
	array( 'db' => 'pengirim_produk',	'dt' => 5 ),
	array( 'db' => 'id',				'dt' => 6 ),
	array( 'db' => 'id',				'dt' => 7 ),
	array( 'db' => 'id',				'dt' => 8 ),
	array( 'db' => 'id',				'dt' => 9 ),
	array( 'db' => 'stat_grosir_qty',	'dt' => 10 ),
    array( 'db' => 'id',				'dt' => 11, 'formatter' => function( $d, $row ) {
            return "<button onclick=\"alert('alert ".$d."');\">My Action</button>";
        }
    )
);
 
// SQL server connection information
$sql_details = array(
    'user' => 'u1005291_niagagarut88_utf8',
    'pass' => 'u1005291_niagagarut88_utf8',
    'db'   => 'u1005291_niagagarut88_utf8',
    'host' => 'localhost'
);
 


$res = SSP::simple( $_GET, $sql_details, $table, $primaryKey, $columns );

echo json_encode($res);