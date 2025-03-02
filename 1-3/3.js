function cetakPola(n){
    for(let baris = n; baris > 0; baris--){ // jumlah baris 
        for( let spasi = 0; spasi < n - baris; spasi++ ){ // spasi untuk bentuk segitiga
            process.stdout.write(" ");  
        }
        for( let kolom = 0; kolom < baris; kolom++ ){
            if( baris%2==0 ){                   // baris genap
                process.stdout.write('+ ');    
            } else {                            // baris ganjil
                if((baris-1)%4 == 0) {          // baris 1,5,9,13, dst...
                    process.stdout.write(kolom%2==0? '# ': '+ ');
                } else {                        // baris 3,7,11,15, dst...
                    process.stdout.write(kolom%2==0? '+ ': '# ');
                }  
            } 
        }
        console.log() // pindah baris
    }
}
cetakPola(15)
