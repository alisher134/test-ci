// libraries
import {
  type FC, useCallback, useEffect, useMemo, useState,
} from 'react';

import { v4 } from 'uuid';
import { MINUTE } from '../constants/common';
import { getJSONFromLS, setToLS } from '../helpers/localStorage';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import TodoSort from './TodoSort';

export interface Todo {
  id: string;
  title: string;
  deadline: string | null;
  isCompleted: boolean;
}

export type Sort = 'all' | 'active' | 'complete';

const App: FC = () => {
  const storedTodo = getJSONFromLS('todo') || [];
  const [sortType, setSortType] = useState<Sort>('all');
  const [todos, setTodos] = useState<Todo[]>(storedTodo);

  const handleAddTodo = useCallback(({ deadline, title }: Omit<Todo, 'id' | 'isCompleted'>) => {
    const id = v4();
    const isCompleted = false;

    setTodos((prev) => [
      ...prev,
      {
        id, title, deadline, isCompleted,
      },
    ]);
  }, []);

  const handleDeleteTodo = useCallback((id: Todo['id']) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  const handleCompleteTodo = useCallback((id: Todo['id']) => {
    setTodos((prev) => prev.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }

      return todo;
    }));
  }, []);

  const handleSortTodo = (type: Sort) => setSortType(type);

  const filteredTodos = useMemo(() => {
    switch (sortType) {
      case 'all':
        return todos;

      case 'active':
        return todos.filter((todo) => todo.isCompleted === false);

      case 'complete':
        return todos.filter((todo) => todo.isCompleted === true);

      default:
        return todos;
    }
  }, [todos, sortType]);

  useEffect(() => {
    setToLS('todo', todos);
  }, [todos]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();

      setTodos((prev) => prev.filter((todo) => {
        if (todo.deadline === null) {
          return true;
        }

        return new Date(todo.deadline).getTime() > now;
      }));
    }, MINUTE);

    return () => clearInterval(interval);
  }, []);

  const activeTodos = useMemo(() => filteredTodos.length, [filteredTodos]);

  const renderMessage = () => (todos.length ? (
    <>
      Ваши оставшиеся тудушки:ddsd
      {activeTodos}
    </>
  ) : <>Нет активных тудушек в этом списке</>);

  return (
    <div className="container">
      <h1 className="title">To Do</h1>
      <TodoForm handleAddTodo={handleAddTodo} />

      <TodoSort handleSortTodo={handleSortTodo} />

      <TodoList handleCompleteTodo={handleCompleteTodo} handleDeleteTodo={handleDeleteTodo} todos={filteredTodos} />

      <p className="active-todos">
        {renderMessage()}
      </p>

      Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem laboriosam aperiam totam, veniam vero ab delectus animi saepe esse expedita nam tempora sapiente? Commodi et, ex omnis reiciendis vel neque earum a exercitationem assumenda sit! Inventore harum voluptatibus ea voluptates repellat amet perspiciatis eligendi reprehenderit maxime! Nesciunt magnam doloribus in corporis beatae fuga, minus reiciendis? Necessitatibus, odit at voluptatum cum autem unde? Exercitationem ipsam animi obcaecati similique eius dolor aliquam facere fugiat. Molestiae odit sint error, delectus voluptatibus recusandae laboriosam eos, accusamus provident impedit nemo, tempore explicabo ipsa? Quod odit quasi accusantium sunt beatae provident, cumque fuga itaque ab asperiores repellat, labore iure eius inventore quidem? Numquam pariatur magni aliquam accusamus quas. Fugit dolor quibusdam dicta. Facere ratione omnis ullam voluptate suscipit libero facilis ea nobis. Tenetur nulla ex voluptate recusandae, optio quidem consectetur fugiat autem aliquam nisi consequuntur dolore adipisci expedita totam amet necessitatibus numquam ullam dignissimos labore, sint fugit? Sit facilis possimus debitis sed rem doloribus, architecto accusamus earum, harum veritatis, quae hic nulla corrupti voluptatum reprehenderit culpa. Magni, dolor nulla aut unde repudiandae animi illum? Adipisci quisquam quasi libero id ratione, esse numquam minus, dolore ea iste qui. Neque fugit maiores minus esse corporis iure dignissimos eius consequuntur nihil dolorem, aut quis, itaque iusto voluptatum corrupti quia necessitatibus? Tenetur excepturi consectetur commodi inventore veniam vero sequi dolore dicta corrupti eos eaque illo corporis facere cupiditate eligendi praesentium iste ex deserunt dignissimos obcaecati, similique ullam! Sapiente tempora placeat velit iste officia incidunt nam molestias. Corporis consequatur nisi cupiditate sapiente sit pariatur assumenda in minima sunt quae nihil, repellendus nesciunt labore dolore autem tempora dolorem deserunt ut magnam accusamus nam officiis tenetur. Impedit distinctio vitae, incidunt necessitatibus pariatur cum, id laudantium provident molestias hic eos placeat debitis unde voluptate sit odio! Reprehenderit unde aut ullam, doloremque illum, ipsa sequi autem voluptatem cumque inventore officiis, tenetur beatae repellat iste error sint? Harum ea consequuntur id nulla perspiciatis iusto cum repellat consequatur, quas possimus mollitia, doloribus aperiam doloremque quam eos deleniti autem nostrum explicabo neque dolorem. Recusandae molestias, voluptate ratione ea deserunt quaerat? Commodi, velit quos saepe in, magnam quo nam, tenetur magni omnis sed repellat earum nihil deserunt! Natus quia est minus, dicta distinctio fuga amet. Optio quibusdam harum, explicabo, maxime eveniet dolor vel blanditiis, iure eligendi beatae deserunt dolore velit? Labore ab animi in repellat quaerat aut incidunt quia pariatur eveniet perspiciatis cumque natus, vero magnam vel odit laborum, dicta officia perferendis doloribus possimus. Dolorum vel commodi, odio nesciunt quos iusto eveniet ratione unde iure laborum minus debitis maxime adipisci, aspernatur autem incidunt sed voluptate quod, dicta architecto. Suscipit obcaecati consectetur cum impedit recusandae officiis reiciendis mollitia cupiditate saepe modi, dolores non voluptatum distinctio aperiam necessitatibus? Nulla excepturi saepe mollitia, ipsa nihil quas. Mollitia laboriosam voluptate recusandae accusantium ducimus dignissimos tempore, quasi dolorum accusamus id in, excepturi ipsam blanditiis, quod autem cum architecto neque ullam commodi ab error non. Tenetur quia eius sint reiciendis veniam quae quos unde est rem distinctio labore iste ducimus tempora odit assumenda ipsum voluptatem nobis repellat, totam sequi. Inventore, minus corporis tempore vero sapiente suscipit non, veritatis autem illo sed fugiat nisi placeat ut neque error recusandae aperiam voluptas sit ducimus dolorum. Nemo dolorum, hic consequuntur nisi aspernatur dolorem et, dolor recusandae, deleniti maiores totam? Odit repellat optio, laudantium labore repellendus sequi officiis quod ab non dignissimos ex, nam deserunt! Perferendis placeat nemo voluptas quia, quidem deserunt deleniti enim laudantium ipsa ullam doloremque unde facilis at iure inventore harum exercitationem quo fugit reiciendis qui minus totam. Explicabo voluptatem tempora consequuntur excepturi eos. Fugit provident adipisci voluptate architecto nostrum! Nesciunt corporis cumque aperiam ab voluptatum nam. Facilis aspernatur odit eos rem molestias sapiente repudiandae autem, rerum ad? Repellat, voluptates voluptatum hic, soluta explicabo vero dolore aliquid nisi, fugiat mollitia in eveniet recusandae quaerat commodi nobis culpa! Quia accusamus quos vitae, voluptatem dolorem et, optio illum maxime natus quasi tempora suscipit obcaecati iure soluta eveniet esse assumenda in laudantium minus ex ipsum repellat quibusdam voluptatum doloremque. Culpa voluptatibus in excepturi quo quae corporis nam vero hic, sit praesentium doloremque exercitationem nisi. Possimus non id dolores quis dolore. Totam alias eveniet veritatis voluptatum fugiat repudiandae quaerat quia! Dicta incidunt atque accusamus quaerat! Error vero rerum minus obcaecati, tempore aut eius officiis repudiandae illum et a cumque soluta! Illum cumque suscipit deleniti unde minus dicta fugit officiis ducimus. Error dolores neque doloremque alias vitae, aspernatur hic necessitatibus quo id maxime, ex minima fugiat facilis doloribus delectus recusandae quasi vero optio magnam sed, mollitia illo culpa velit. Earum iusto rem quos eaque aliquam sit tenetur cum, quibusdam ipsa eum, quas, magni beatae perspiciatis. Nemo quisquam minima iure corrupti fuga esse rem asperiores, harum est at maxime officiis magni cupiditate nostrum tempore, explicabo qui quidem voluptatum recusandae itaque omnis alias molestias architecto sequi. Quasi voluptate explicabo ipsa nisi recusandae, consequatur assumenda similique corporis! Voluptates eum aperiam voluptatem ipsam. Odit neque aut in non quod aperiam quas cupiditate quia optio aliquam, enim excepturi sapiente quaerat voluptatem nihil, quis provident maxime tenetur. Illo quo nobis dicta consectetur cumque neque aut officiis voluptatibus libero adipisci quia rem praesentium magni provident voluptate corrupti, beatae explicabo. Laboriosam doloribus nam ut reprehenderit sed, debitis tempora praesentium repudiandae nesciunt illum eum nihil non neque? Error aliquam, ullam eaque accusamus deserunt quibusdam porro architecto odit obcaecati ipsa ratione modi id repellendus laboriosam debitis. Quod, inventore vitae laboriosam aspernatur explicabo quam dicta, voluptate illo ratione nobis delectus amet tempora fuga optio facere repellendus minima, soluta quae at quo? Deleniti, fugit qui eveniet sunt maxime provident debitis blanditiis incidunt et quas in voluptatibus earum consequuntur eum, commodi, illo unde repellendus hic doloremque suscipit temporibus possimus similique tempora? Quae ea aliquid rem eius dolor eveniet qui ut quisquam vel ad iure delectus, illo, nihil suscipit ex, enim consequatur excepturi ratione? Tempora nobis rerum provident odit excepturi nihil officiis sequi recusandae nulla quis repellendus, officia culpa et laboriosam vitae inventore corporis? Consequuntur dolor facilis modi cupiditate, tempora nobis! Non aliquid ducimus, neque molestias odio ipsam alias nulla facilis sapiente nam blanditiis at!
    </div>
  );
};

export default App;
