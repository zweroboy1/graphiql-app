// import React from 'react';
// import '../Schema/Schema.css';
// import { OfType2, Type } from '../../types/types';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../../store/store';
// import { setActiveType } from '../../store/slices/activeTypeSlice';

// export const ShowDetails: React.FC = () => {
//   // const schema = useSelector((state: RootState) => state.schemas.schema);
//   // const rootQuery =
//   //   schema && schema.__schema.types.find((elem) => elem.name === 'Query');
//   const dispatch = useDispatch();
//   const activeType = useSelector((state: RootState) => state.type.name)
//   console.log(activeType);

//   const renderType = (type: OfType2 | Type): string => {
//     if (type.ofType) {
//       const typeName = type.name || '';
//       return typeName + (typeof type.ofType === 'string' ? type.ofType : renderType(type.ofType));
//     } else {
//       return type.name || '';
//     }
//   };

//   return (
//     <>
//       <div>
//         <ul>
//           {/* {rootQuery?.fields
//             ? rootQuery?.fields.map((field) => (
//                 <li
//                   key={field.name}
//                   style={{ padding: '5px' }}
//                 >
//                   {field.name}
//                   {field.args && <span>( </span>}
//                   {field.args &&
//                     field.args.map((arg) => (
//                       <span key={arg.name}>
//                         {arg.name}: <button onClick={() => dispatch(setActiveType(renderType(arg.type)))}>{renderType(arg.type)}</button>,
//                       </span>
//                     ))}
//                   {field.args && <span>)</span>}
//                   {': '}
//                   <button onClick={() => dispatch(setActiveType(renderType(field.type)))}>{renderType(field.type)}</button>
//                   <div>{field.description}</div>
//                 </li>
//               ))
//             : []} */}
//         </ul>
//       </div>
//     </>
//   );
// };
