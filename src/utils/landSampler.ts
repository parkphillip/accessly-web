
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore – JSON import
import world110 from "@/data/world110.json";

function topoFeature(topo: any, objName: string) {
  const o = topo.objects[objName];
  if (!o || !o.geometries) {
    return { type: "FeatureCollection", features: [] };
  }
  return { type: "FeatureCollection", features: o.geometries.map((g:any)=>({
    type:"Feature", properties:{}, geometry:g
  }))};
}

const landPolys = topoFeature(world110, "land").features;

export function isLand(lon:number, lat:number) {
  return landPolys.some((f: any) => inPoly(lon, lat, f.geometry.coordinates as any));
}

// simple ray-cast test
function inPoly(lon:number, lat:number, rings:number[][][]) {
  let inside=false;
  rings.forEach(poly=>{
    poly.forEach(ring=>{
      for(let i=0,j=ring.length-1;i<ring.length;j=i++){
        const xi=ring[i][0], yi=ring[i][1];
        const xj=ring[j][0], yj=ring[j][1];
        const intersect=((yi>lat)!==(yj>lat)) &&
          lon < ((xj-xi)*(lat-yi))/(yj-yi)+xi;
        if(intersect) inside=!inside;
      }
    });
  });
  return inside;
}
