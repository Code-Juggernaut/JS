#include <iostream>

int main(){
    int array[100];
    int max = 99;
    int min = 0;

    int find_num = 10;

    for(int i = 0;i<100;i++){
        array[i] = i;
    }
    while(min<=max){
        int position = min+((max - min)>>1);
        if(array[position] == find_num){
            std::cout<<"Found at:"<<position;
            break;
        }else{
            if(find_num>array[position]){
                min = position+1;
            }else{
                max = position-1;
            }
            
        }
    }
}