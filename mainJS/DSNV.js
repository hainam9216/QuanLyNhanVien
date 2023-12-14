function DSNV(sv) {
    this.arr = []

    // thêm nhân viên
    this.themNV = function (nv) {
        this.arr.push(nv)
    }
    // Tim vi tri
    this.timViTri = function (id) {
        var index = -1
        for (var i = 0; i < this.arr.length; i++) {
            const nv = this.arr[i]
            if (nv.account === id) {
                index = i
                break
            }
        }
        return index
    }
    // xoa nhan vien
    this.XoaNV = function (id) {
        const index = this.timViTri(id)
        if (index === -1) {
            alert("Không tìm thấy")
        }
        else {
            this.arr.splice(index, 1)
        }
    }
    //Lay thong tin
    this.layThongTin = function (id) {
        const index = this.timViTri(id)
        if (index !== -1) {
            return this.arr[index]
        }
        return null
    };
    //CapNhatSV
    this.capNhatNV = function (nv) {
        const index = this.timViTri(nv.account)
        if (index !== -1) {
            this.arr[index] = nv
        }
    }
    //search
    this.TimKiemNV = function (keywork) {
        var mangTimKiem = []
        //Duyet Mang
        for (var i = 0; i < this.arr.length; i++) {
            const nv = this.arr[i]
            //chuyen keywork ve chu thuong
            const keyworklower = keywork.toLowerCase()
            //Chuyen rank ve chu thuong
            const rankLowerCase = nv.rank.toLowerCase()
            //So sanh
            const indexLower = rankLowerCase.indexOf(keyworklower)

            // đẩy dữ liệu phù hợp vào mảng
            if (indexLower !== -1) {
                mangTimKiem.push(nv)
            }
        }
        return mangTimKiem
    }
}