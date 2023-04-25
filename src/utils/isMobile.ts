export const isMobile = () => {
  if('ontouchstart' in document.documentElement){
  }else{
      alert("모바일 환경에서 이용해주세요.")
  }
};
